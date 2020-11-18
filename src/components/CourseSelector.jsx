import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Form, 
    Col, 
    Button
} from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import _ from 'lodash';
import flatMap from 'lodash/flatMap';
import { getCourseList, getCourse } from '../models/apiCalls';

function CourseSelector(props) {
    const [courseInput, setCourseInput] = useState('');
    const [courseList, setCourseList] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [courseError, setCourseError] = useState('');

    const handleCourseInputChange = newValue => {
        setCourseError('');
        setCourseInput(newValue);
    }

    function getDefaultOptions() {
        if (props.requirements.requirements.code) {
            var allCourses = [];
            Object.keys(props.requirements.requirements).map((ruleName) => {
                if (Array.isArray(props.requirements.requirements[ruleName])) {
                    var rule = props.requirements.requirements[ruleName].flatMap(o => o.M).flatMap(o => o.courses);
                    
                    const course = rule.map((ruleWithCourse) => {
                        if (ruleWithCourse && Array.isArray(ruleWithCourse.L)) {
                            return ruleWithCourse.L;
                        }
                    });

                    allCourses = allCourses.concat(_.flatten(course));
                }
            });
    
            var coursesToDisplay = [];
            
            allCourses.map((course) => {
                if (course && coursesToDisplay.length < 10) {
                    coursesToDisplay.push({
                        course_code: course.M.code.S, 
                        label: course.M.code.S
                    });
                }
            });

            return coursesToDisplay;
        }
    }

    const promiseOptions = inputValue => {
        return new Promise(async resolve => {
            const courses = await getCourseList(inputValue);
            setCourseList(courses);
            const formattedCourses = courses.map((course) => {
                return {
                    course_code: course.item.Item.course_code.S,
                    label: `${course.item.Item.course_code.S}: ${course.item.Item.name.S}`
                }
            });
            resolve(formattedCourses);
        });
    }

    async function courseAdded() {
        console.log("COURSE INPUT", courseInput);
        // Get the course from the course list
        var courseFromDataList;
        if (courseList.length) {
            courseFromDataList = _.find(courseList, function(course) {
                return course.item.Item.course_code.S === courseInput.course_code
            });
        }

        if (!courseFromDataList) {
            courseFromDataList = await getCourse(courseInput.course_code);

        }

        if (!courseFromDataList) {
            setCourseError(`Course not found`);
        }
        else {
            console.log("CDL", courseFromDataList);
            const courseToAdd = courseFromDataList.Item || courseFromDataList.item.Item;
            console.log("to add", courseToAdd);
            const newCompletedCourses = completedCourses.concat([courseToAdd]);
            setCompletedCourses(newCompletedCourses);
    
            props.addedCourse(courseToAdd);
    
            setCourseInput('');
        }

    }

    const listOfCompletedCourses = completedCourses.length && completedCourses.map((completedCourse, i) => {
        const link = `https://www.handbook.unsw.edu.au${completedCourse.link.S}`;
        return (
            <a style={{ textDecoration: 'none' }} href={link} target='_blank' key={completedCourse.course_code.S + i}>
                <Button variant="secondary" block>
                        {completedCourse.course_code.S}: {completedCourse.name.S}
                </Button>
            </a>
        )
    });

    return (
        <Form style={{padding: '10px'}}>
            <Form.Row>
                <Col>
                    <AsyncSelect onChange={handleCourseInputChange} cacheOptions defaultOptions={getDefaultOptions()} loadOptions={promiseOptions} placeholder={"Add courses you've completed..."} value={courseInput}/>
                    {courseError &&
                    <Form.Text className="text-muted">
                        {courseError}
                    </Form.Text>
                    }
                </Col>
                <Col xs="auto">
                    <Button onClick={() => { courseAdded() }} className="mb-2">
                        Add
                    </Button>
                </Col>
            </Form.Row>
            {completedCourses.length ? 
                <>
                    Completed Courses:
                    {listOfCompletedCourses}
                </>
            : <></>    
            }
        </Form>
    )
}

const mapStateToProps = state => {
    return {
        requirements: state.requirements
    };
};

export default connect(mapStateToProps, null)(CourseSelector);