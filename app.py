from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('') 
db = client.dbsparta



@app.route('/')
def home():
    return render_template('index.html')

@app.route('/intro', methods=["POST"])
def intro_post(): 
    id_receive = request.form['id_give']
    name_receive = request.form['name_give']                                                           
    desc_receive = request.form['desc_give']                                                            
    mbti_receive = request.form['mbti_give']
    style_receive = request.form['style_give']
                                                                                                    
    doc = {
        'id':id_receive,
        'name':name_receive,
        'desc':desc_receive,
        'mbti':mbti_receive,
        'style':style_receive
    }
    db.intros.insert_one(doc)
    return jsonify({'msg':'저장 완료'})

@app.route("/intro", methods=["GET"])
def intro_get():
    all_intro = list(db.intros.find({},{'_id':False}))
    return jsonify({'result':all_intro ,'msg':'GET'})

# 수정하기 (김재용)
@app.route('/update', methods=['PUT'])
def update_product():
    id_modify_receive = request.form['id_modify_give']
    name_modify_receive = request.form['name_modify_give']
    desc_modify_receive = request.form['desc_modify_give']
    mbti_modify_receive = request.form['mbti_modify_give']
    style_modify_receive = request.form['style_modify_give']

    doc = {
        'name': name_modify_receive,
        'desc': desc_modify_receive,
        'mbti': mbti_modify_receive.replace('--', ''),
        'style': style_modify_receive
    }

    db.intros.update_one({'id': id_modify_receive}, {'$set': doc})
    return jsonify({'msg':'수정 완료'})

# 삭제하기 (김재용)
@app.route('/delete', methods=['DELETE'])
def delete_item():
    id_receive = request.form['id_give']
    db.intros.delete_one({'id':id_receive})
    return {'msg':'삭제 완료'}

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)