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

function getProgram(code, year) {
    return new Promise(async (resolve, reject) => {
        try {

            var config = {
                method: 'post',
                url: 'http://localhost:3000/getProgram',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    code: code, 
                    implementation_year: year
                }
            };

            axios(config)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log("AXIOS ERROR GETTING PROGRAM", error);
                    reject(error);
                });
        } catch (ex) {
            console.log("EXCEPTION GETTING PROGRAM", ex);
            reject(ex);
        }
    });
}

function Inputs() {
    const [query, setQuery] = useState('');
    const [programError, setProgramError] = useState('unset');
    const [dataList, setDataList] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedSpecialisations, setSelectedSpecialisations] = useState({});
    const [specialisationError, setSpecialisationError] = useState({});
    
    const handleChange = ({ target: { value } }) => {
        setProgramError('unset');
        setQuery(value);

        const search = _.debounce(sendQuery, 300);

        search(value);
    };

    const handleSpecialisationChange = ({ target: { value, name } }) => {
        console.log("VALUE", value);
        console.log("NAME", name);

        setSelectedSpecialisations(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const sendQuery = async value => {
        const programs = await getProgramList(value);

        setDataList(programs);
    };

    async function programAdded() {
        // See if it's a valid program
        const code = query.split(':')[0];
        const year = query.substring(query.length - 5, query.length - 1);
        
        var programFromDataList = _.find(dataList, function(program) {
            return program.item.Item.code.S === code && program.item.Item.implementation_year.S === year;
        });

        if (!programFromDataList) {
            programFromDataList = await getProgram(code, year);
        }

        if (!programFromDataList) {
            setProgramError('Program not found');
        }
        else {
            setProgramError('');
        }

        setSelectedProgram(programFromDataList);
        console.log(programFromDataList);
    }

    async function specialisationAdded() {
        // Check if it's a valid program
        Object.keys(selectedSpecialisations).map((spec) => {
            const isValid = _.find(selectedProgram.item.Item[spec.toLowerCase()].L, function(options) {
                return options.S === selectedSpecialisations[spec];
            });

            if (!isValid) {
                console.log(`Couldn't find ${spec} called ${selectedSpecialisations[spec]} for this program`);
                setSpecialisationError(prevState => {
                    return { ...prevState, [spec]: `Couldn't find ${spec} called ${selectedSpecialisations[spec]}` };
                });
            }
        });
    }

    function SpecificSpecialisation(specialisationType, specialisationList) {
        return (
            <div className="form-group">
                <label>{specialisationType}</label>

                <div className="input-group mb-3">
                    <input onChange={handleSpecialisationChange} className={'form-control'} list={specialisationType} name={specialisationType} value={selectedSpecialisations[specialisationType]}/>
                    <div className="input-group-append">
                        <button onClick={() => {specialisationAdded()}} className="btn btn-secondary">Add</button>
                    </div>
                    {programError && <div className="invalid-feedback">{programError}</div>}
                </div>                
                <datalist id={specialisationType}>
                    {specialisationList && specialisationList.length && specialisationList.map((spec, i) => {
                        return <option onClick={(e) => { handleClick(e) }} key={i + spec.S}> {spec.S} </option>
                    })}
                </datalist>
            </div>


            // <div className="form-group">
            //     <label className="control-label">{specialisationType}</label>

            //     <div className="input-group mb-3">
            //         <input onChange={(event) => {handleSpecialisationChange(event, specialisationType)}} className='form-control' list={specialisationType} name={specialisationType} />
            //         <div className="input-group-append">
            //             <button onClick={() => { specialisationAdded() }} className="btn btn-secondary">Add</button>
            //         </div>
            //         {specialisationError[specialisationType] && <div className="invalid-feedback">{specialisationError[specialisationType]}</div>}
            //     </div>
            //     <datalist id={specialisationType}>
            //         {specialisationList && specialisationList.length && specialisationList.map((spec, i) => {
            //             return <option onClick={(e) => { handleClick(e) }} key={i + spec.S}> {spec.S} </option>
            //         })}
            //     </datalist>
            // </div>
        )
    }

    function Specialialisations() {
        return (
            <>
                {selectedProgram && selectedProgram.item.Item.majors && SpecificSpecialisation('Majors', selectedProgram.item.Item.majors.L)}
                {selectedProgram && selectedProgram.item.Item.minors && SpecificSpecialisation('Minors', selectedProgram.item.Item.minors.L)}
                {selectedProgram && selectedProgram.item.Item.honours && SpecificSpecialisation('Honours', selectedProgram.item.Item.honours.L)}
                {selectedProgram && selectedProgram.item.Item.specialisations && SpecificSpecialisation('Specialisations', selectedProgram.item.Item.specialisations.L)}
            </>
        )
    }

    const programInputClass = `form-control ${programError === 'unset' ? '' : programError ? 'is-invalid' : 'is-valid'}`;
    return (
        <div className="jumbotron">
            {/* Programs */}
            <div className="form-group">
                <label>Program</label>

                <div className="input-group mb-3">
                    <input onChange={handleChange} className={programInputClass} list="programs" name="browser" />
                    <div className="input-group-append">
                        <button onClick={() => {programAdded()}} className="btn btn-secondary">Add</button>
                    </div>
                    {programError && <div className="invalid-feedback">{programError}</div>}
                </div>                
                <datalist id="programs">
                    {dataList && dataList.length && dataList.map((program, i) => {
                        return <option onClick={(e) => {handleClick(e)}} key={i + program.item.Item.code.S}> {program.item.Item.code.S}: {program.item.Item.title.S} ({program.item.Item.implementation_year.S}) </option>
                    })}
                </datalist>
            </div>

            {/* Specialisations */}
            <Specialialisations />

            {/* Go */}
            <button type="submit" disabled={programError || programError === 'unset'} className="btn btn-primary">Go</button>

        </div>
    )
}

export default Inputs;