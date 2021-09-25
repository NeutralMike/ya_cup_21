from http.server import SimpleHTTPRequestHandler, HTTPServer
import socketserver
import json

PORT = 7777

class Server(SimpleHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()


    def do_GET(self):
        self._set_headers()
        self.wfile.write(json.dumps([8, 6, -2, 2, 4, 17, 256, 1024, -17, -19]).encode())


with HTTPServer(("", PORT), Server) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()