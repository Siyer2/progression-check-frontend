import _ from 'lodash';

export function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

//==== Logic when a course is added ====//
export async function getRemainingRequirements(newCourse, program) {
    var adjustRulesPromises = Object.keys(program).map((ruleName) => {
        return new Promise((resolve, reject) => {
            try {
                // Check if each object has a course list
                var arrayToMap = Array.isArray(program[ruleName]) ? program[ruleName] : Array.isArray(program[ruleName].L) ? program[ruleName].L : null;
                if (arrayToMap) {
                    arrayToMap.map((individualRule) => {
                        if (individualRule.M && individualRule.M.courses && individualRule.M.courses.L.length) {
                            const removedCourse = _.remove(individualRule.M.courses.L, function (course) {
                                return course.M.code.S === newCourse.Item.course_code.S;
                            });

                            // If a course was found and removed, then add it to the completed course list
                            if (removedCourse.length) {
                                individualRule.M.completedCourses ? individualRule.M.completedCourses.push(removedCourse) : individualRule.M.completedCourses = [removedCourse];

                                // Adjust the credit points if it exists
                                const oldCreditPoints = individualRule.M.credit_points && individualRule.M.credit_points.S ? parseInt(individualRule.M.credit_points.S) : null;
                                if (oldCreditPoints && newCourse.Item.credit_points) {
                                    const newCreditPoints = newCourse.Item.credit_points.S ? parseInt(newCourse.Item.credit_points.S) : 0;
                                    individualRule.M.credit_points.S = oldCreditPoints - newCreditPoints;
                                }

                                // Adjust the credit_points_max if it exists
                                const oldCreditPointsMax = individualRule.M.credit_points_max && individualRule.M.credit_points_max.S ? parseInt(individualRule.M.credit_points_max.S) : null;
                                if (oldCreditPointsMax && newCourse.Item.credit_points) {
                                    const newCreditPointsMax = newCourse.Item.credit_points.S ? parseInt(newCourse.Item.credit_points.S) : 0;
                                    individualRule.M.credit_points_max.S = oldCreditPointsMax - newCreditPointsMax;
                                }
                            }
                        }
                    });
                }

                resolve();
            } catch (ex) {
                console.log("EXCEPTION ADJUSTING RULES PROMISES", ex);
                reject(ex);
            }
        });
    });
    await Promise.all(adjustRulesPromises);
    
    const changes = await Promise.all([
        adjustUOC(newCourse, program)
    ]);
    // const changes = await Promise.all(adjustRulesPromises.concat([adjustUOC(newCourse, program)]));

    program.minimumUOC = changes[0];
    return program;
}

// Fix minimum UOC
function adjustUOC(newCourse, program) {
    return new Promise((resolve, reject) => {
        try {
            const existingUOC = parseInt(program.minimumUOC);
            const courseUOC = newCourse.Item.credit_points ? parseInt(newCourse.Item.credit_points.S) : 0;
            const newUOC = existingUOC - courseUOC;

            resolve(newUOC);
        } catch (ex) {
            console.log("EXCEPTION ADJUSTING UOC", ex);
            reject(ex);
        }
    });
}

//==== Logic to see if a rule should be displayed ====//
export function ruleIsCompleted(rule) {
    if (rule.M.completedCourses &&
        (rule.M.credit_points && rule.M.credit_points.S === 0 || rule.M.credit_points_max && rule.M.credit_points_max.S === 0)
        || (rule.M.courses && rule.M.courses.L.length === 0)
    ) {
        return true;
    }
}