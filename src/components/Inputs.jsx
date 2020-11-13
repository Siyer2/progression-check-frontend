import React, { useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Form, Col, Button } from 'react-bootstrap';
import AsyncSelect from 'react-select/async'

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
    const [programInput, setProgramInput] = useState('');
    const [programError, setProgramError] = useState('unset');
    const [dataList, setDataList] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedSpecialisations, setSelectedSpecialisations] = useState({});
    const [specialisationError, setSpecialisationError] = useState({});

    const handleSpecialisationChange = ({ target: { value, name } }) => {
        setSelectedSpecialisations(prevState => {
            return { ...prevState, [name]: value };
        });
        setSpecialisationError(prevState => {
            return { ...prevState, [name]: '' };
        });
    };

    async function programAdded() {
        // See if it's a valid program
        const code = programInput.code;
        const year = programInput.year;
        
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

    function goClicked() {
        console.log("selectedProgram", selectedProgram);
        console.log("selectedSpec", selectedSpecialisations);
        
    }

    function SpecificSpecialisation(specialisationType, specialisationList) {
        return (
            <div className="form-group">
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>{specialisationType}</Form.Label>
                        <Form.Control as="select" custom onChange={handleSpecialisationChange} value={selectedSpecialisations[specialisationType]} name={specialisationType}>
                            <option> </option>
                            {specialisationList && specialisationList.length && specialisationList.map((spec, i) => {
                                return <option key={i + spec.S}> {spec.S} </option>
                            })}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </div>
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

    const promiseOptions = inputValue => {
        return new Promise(async resolve => {
            const programs = await getProgramList(inputValue);
            setDataList(programs);
            const formattedPrograms = programs.map((program) => {
                return {
                    year: program.item.Item.implementation_year.S, 
                    code: program.item.Item.code.S,
                    label: `${program.item.Item.code.S}: ${program.item.Item.title.S} (${program.item.Item.implementation_year.S})`
                }
            });
            resolve(formattedPrograms);
        });
    }

    const handleProgramInputChange = newValue => {
        setProgramInput(newValue);
    }

    const isGoDisabled = (programError || programError === 'unset') || (specialisationError['Majors'] || specialisationError['Minors'] || specialisationError['Honours'] || specialisationError['Specialisations']);
    return (
        <div className="jumbotron">
            {/* Programs */}
            <Form>
                <label>Program</label>
                <Form.Row>
                    <Col>
                        <AsyncSelect onChange={handleProgramInputChange} cacheOptions defaultOptions loadOptions={promiseOptions} placeholder={'Search for a program...'}/>
                    </Col>
                    <Col xs="auto">
                        <Button onClick={() => { programAdded() }} className="mb-2">
                            Add
                        </Button>
                    </Col>
                </Form.Row>
            </Form>

            {/* Specialisations */}
            <Specialialisations />

            {/* Go */}
            <button onClick={() => {goClicked()}} type="submit" disabled={isGoDisabled} className="btn btn-primary">Go</button>

        </div>
    )
}

export default Inputs;