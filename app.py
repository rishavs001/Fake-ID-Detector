from flask import Flask,render_template,request,jsonify
import pickle
import pandas as pd
import numpy as np
app = Flask(__name__)

model = pickle.load(open("trained_model.pkl",'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/endpoint', methods=['POST'])
def endpoint():
    data = request.get_json()
    profile=int(data["profile"])
    chardivuser=float(data["chardivuser"])
    chardivname=float(data["chardivname"])
    wordsname=int(data["wordsname"])
    userequalname=int(data["userequalname"])
    description=int(data["description"])
    externalurl=int(data["externalurl"])
    private=int(data["private"])
    posts=int(data["posts"])
    following=int(data["following"])
    followers=int(data["followers"])
    
    # print(profile)
    # print(chardivname)
    # print(wordsname)
    # temp = model.predict([[profile,chardivuser,wordsname,chardivname,userequalname,description,externalurl,private,posts,followers,following]])
    
    input_data = (profile,chardivuser,wordsname,chardivname,userequalname,description,externalurl,private, posts,followers,following)
    inputnp = np.asarray(input_data)
    input_data_reshaped = inputnp.reshape(1,-1)
    temp = model.predict(input_data_reshaped)
    print(temp);
    if(temp[0]==1):
        response = {
        'message': 'Data received and processed successfully',
        'result': "fake",
    }
    else:response = {
        'message': 'Data received and processed successfully',
        'result': "real",
    }
    # Prepare the response data
    
    
    # Return the response as JSON
    return jsonify(response)

if __name__ == '__main__':
    app.run()
