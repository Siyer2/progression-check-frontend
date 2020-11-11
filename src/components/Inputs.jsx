import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';

function getProgramList(query) {
    return new Promise(async (resolve, reject) => {
        try {
            var config = {
                method: 'post',
                url: 'http://localhost:3000/autocompletePrograms',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { query }
            };

            axios(config)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log("AXIOS ERROR GETTING PROGRAM LIST", error);
                    reject(error);
                });
        } catch (ex) {
            console.log("EXCEPTION GETTING PROGRAM LIST", ex);
            reject(ex);
        }
    });
}

function Inputs(props) {
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState({});
    const [dataList, setDataList] = useState([]);

    const handleChange = ({ target: { value } }) => {
        setQuery(value);

        const search = _.debounce(sendQuery, 300);

        search(value);
    };

    const sendQuery = async value => {
        const programs = await getProgramList(value);

        setDataList(programs);
    };

    return (
        <div className="jumbotron">
            {/* {dataList && dataList.length && dataList.map((program, i) => {
                return <div key={i + program.item.Item.code.S}> {program.item.Item.code.S}: {program.item.Item.title.S} ({program.item.Item.implementation_year.S})</div>
            })} */}
            {/* Programs */}
            <div className="form-group">
                <label>Program</label>
                <input onChange={handleChange} className="form-control" list="programs" name="browser"/>
                <datalist id="programs">
                    {dataList && dataList.length && dataList.map((program, i) => {
                        return <option key={i + program.item.Item.code.S}> {program.item.Item.code.S}: {program.item.Item.title.S} ({program.item.Item.implementation_year.S}) </option>
                    })}
                </datalist>
            </div>

            {/* Specialisations */}
            <div className="form-group">
                <label className="control-label">Major</label>
                <div className="form-group">
                    <div className="input-group mb-3">
                        <select className="form-control" id="exampleSelect1">
                            <option>None</option>
                            <option>2</option>
                        </select>
                        <div className="input-group-append">
                            <button className="btn btn-secondary">Add</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Go */}
            <button type="submit" className="btn btn-primary">Go</button>

        </div>
    )
}

export default Inputs;