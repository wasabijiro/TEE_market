#!/usr/local/bin/env python3

import argparse
import socket
import sys
from flask import Flask, request, jsonify
import json

app = Flask(__name__)

class VsockClient:
    def __init__(self, use_tcp=False):
        self.use_tcp = use_tcp
        
    def send_and_receive(self, endpoint, data):
        try:
            if self.use_tcp:
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            else:
                sock = socket.socket(socket.AF_VSOCK, socket.SOCK_STREAM)
            
            sock.settimeout(5)
            sock.connect(endpoint)
            
            # Send data
            message = json.dumps(data)
            sock.sendall(message.encode())
            
            # Receive response
            response_data = b''
            while True:
                chunk = sock.recv(1024)
                if not chunk:
                    break
                response_data += chunk
            
            sock.close()
            
            return response_data.decode()
        except Exception as e:
            return f"Error communicating with Enclave: {str(e)}"

# Global vsock client instance
vsock_client = None
enclave_endpoint = None

@app.route('/', methods=['GET', 'POST'])
def handle_request():
    try:
        # Prepare data to forward to Enclave
        data = {
            'method': request.method,
            'path': request.path,
            'headers': dict(request.headers),
            'data': request.get_data(as_text=True) if request.method == 'POST' else None
        }
        
        # Forward to Enclave via vsock
        response = vsock_client.send_and_receive(enclave_endpoint, data)
        
        # Parse response if it's JSON
        try:
            response_data = json.loads(response)
            return jsonify(response_data)
        except json.JSONDecodeError:
            # Return as plain text if not JSON
            return response
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'server': 'server1'})

def main():
    global vsock_client, enclave_endpoint
    
    parser = argparse.ArgumentParser(description='Server1 - HTTP to vsock proxy')
    parser.add_argument('--http-port', type=int, default=5000, 
                       help='HTTP port to listen on (default: 5000)')
    parser.add_argument('--tcp', action='store_true', 
                       help='Use TCP socket instead of VSOCK for Enclave connection')
    parser.add_argument('--enclave-cid', type=int, default=None,
                       help='Enclave CID for VSOCK connection')
    parser.add_argument('--enclave-host', type=str, default='localhost',
                       help='Enclave host for TCP connection (default: localhost)')
    parser.add_argument('--enclave-port', type=int, default=9001,
                       help='Enclave port (default: 9001)')
    
    args = parser.parse_args()
    
    # Initialize vsock client
    vsock_client = VsockClient(use_tcp=args.tcp)
    
    # Set Enclave endpoint
    if args.tcp:
        enclave_endpoint = (args.enclave_host, args.enclave_port)
        print(f"Server1 will connect to Enclave via TCP at {args.enclave_host}:{args.enclave_port}")
    else:
        if args.enclave_cid is None:
            print("Error: --enclave-cid is required for VSOCK mode")
            sys.exit(1)
        enclave_endpoint = (args.enclave_cid, args.enclave_port)
        print(f"Server1 will connect to Enclave via VSOCK at CID {args.enclave_cid}:{args.enclave_port}")
    
    # Start Flask server
    print(f"Server1 starting on HTTP port {args.http_port}")
    app.run(host='0.0.0.0', port=args.http_port, debug=False)

if __name__ == '__main__':
    main()