#!/usr/local/bin/env python3

import argparse
import socket
import sys
import json
import datetime

class VsockServer:
    def __init__(self, use_tcp=False):
        self.use_tcp = use_tcp
        self.conn_backlog = 128

    def bind(self, port):
        if self.use_tcp:
            self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            self.sock.bind(('0.0.0.0', port))
            print(f"Enclave listening on TCP port {port}")
        else:
            self.sock = socket.socket(socket.AF_VSOCK, socket.SOCK_STREAM)
            self.sock.bind((socket.VMADDR_CID_ANY, port))
            print(f"Enclave listening on VSOCK port {port}")
        self.sock.listen(self.conn_backlog)

    def process_request(self, data):
        """Process the request and generate a response"""
        try:
            request = json.loads(data)

            # Log the request
            print(f"[{datetime.datetime.now()}] Received {request.get('method')} request for {request.get('path')}")

            # Generate response based on the path
            if request.get('path') == '/':
                response = {
                    'message': 'Hello from Enclave!',
                    'server': 'enclave',
                    'timestamp': datetime.datetime.now().isoformat(),
                    'request_method': request.get('method')
                }
            elif request.get('path') == '/echo':
                response = {
                    'echo': request.get('data', ''),
                    'server': 'enclave',
                    'headers_received': request.get('headers', {})
                }
            else:
                response = {
                    'message': f"Path {request.get('path')} processed by Enclave",
                    'server': 'enclave',
                    'timestamp': datetime.datetime.now().isoformat()
                }

            return json.dumps(response)

        except json.JSONDecodeError:
            # If not JSON, just echo back
            return f"Enclave received: {data}"
        except Exception as e:
            return json.dumps({'error': str(e), 'server': 'enclave'})

    def run(self):
        print("Enclave is ready to accept connections...")

        while True:
            try:
                # Accept connection
                client_sock, client_addr = self.sock.accept()

                if self.use_tcp:
                    print(f"Connection from {client_addr}")
                else:
                    print(f"Connection from CID: {client_addr[0]}, Port: {client_addr[1]}")

                # Receive data
                data = b''
                while True:
                    chunk = client_sock.recv(1024)
                    if not chunk:
                        break
                    data += chunk
                    # Check if we have a complete message (simple check for now)
                    if b'}' in chunk:
                        break

                if data:
                    # Process request
                    response = self.process_request(data.decode())

                    # Send response
                    client_sock.sendall(response.encode())
                    print(f"Response sent: {len(response)} bytes")

                # Close connection
                client_sock.close()

            except KeyboardInterrupt:
                print("\nEnclave shutting down...")
                break
            except Exception as e:
                print(f"Error handling connection: {e}")
                continue

        self.sock.close()

def main():
    parser = argparse.ArgumentParser(description='Enclave - vsock backend server')
    parser.add_argument('--port', type=int, default=9001,
                       help='Port to listen on (default: 9001)')
    parser.add_argument('--tcp', action='store_true',
                       help='Use TCP socket instead of VSOCK')

    args = parser.parse_args()

    server = VsockServer(use_tcp=args.tcp)
    server.bind(args.port)
    server.run()

if __name__ == '__main__':
    main()
