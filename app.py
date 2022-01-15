from flask import Flask, jsonify
import json

#
#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/api/institutional")
def institutional_data():

    # read institutional json file
    file = open("./Data_ETL/inst.json")
    json_dict = json.load(file)
    file.close()

    response = jsonify(json_dict)

    return response


@app.route("/api/individual")
def individual_data():

    # read individual json file
    file = open("./Data_ETL/indiv.json")
    json_dict = json.load(file)
    file.close()

    response = jsonify(json_dict)

    return response


if __name__ == "__main__":
    app.run(debug=True)
