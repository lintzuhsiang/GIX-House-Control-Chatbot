from flask import Flask, render_template, request
import re
app = Flask(__name__)
@app.route("/hello")

def hello_world():
        return "hello"

@app.route("/")
def root():
        return render_template('index.html')

# @app.route('/save-canvas')#, methods=['POST'])
# def save_canvas():
#     image_b64=request.values[('imageBase64')]
#     imgstr=re.search(r'data:image/png;base64,(.*)',image_b64).group(1)
#     output=open('output.png', 'wb')
#     decoded=base64.b64decode(imgstr)
#     output.write(decoded)
#     output.close()

if(__name__)=='__main__':
        app.run(host='127.0.0.1', port=8080)
