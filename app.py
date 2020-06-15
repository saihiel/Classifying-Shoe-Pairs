from flask import Flask, render_template, jsonify, request
from classifier import classify_shoes
import base64
import numpy as np
import io
from PIL import Image, ImageOps

app = Flask(__name__)

shoes=[]
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/classify', methods=['POST'])
def classify():
    json = request.get_json()
    status = json['status']
    if status == "classify" and len(shoes)>=2:
        pred = classify_shoes(shoes.pop(), shoes.pop())
        return pred
    else:
        return ""

@app.route('/receive_shoe', methods=['POST'])
def receive_shoe():
    global shoes
    json = request.get_json()
    start = json['image'].find(',')
    base64_img_bytes = json['image'][start+1:].encode()
    image_bytes = base64.decodebytes(base64_img_bytes)
    img = Image.open(io.BytesIO(image_bytes))
    img = ImageOps.mirror(img)
    img = np.array(img)
    shoes.append(img)

    return jsonify(result="")

if __name__ == '__main__':
    app.run()