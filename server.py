from http.server import *

if __name__ == '__main__':
    host = ''
    port = 8080
    server = HTTPServer((host, port), SimpleHTTPRequestHandler)

    print("Starting HTTP server on port {}.".format(port))
    
    server.serve_forever()
