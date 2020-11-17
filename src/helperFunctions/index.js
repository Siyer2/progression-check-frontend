export function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

//==== ====//
export async function getRemainingRequirements(newCourse, program) {
    console.log("program", program);
    console.log("new course", newCourse);
    const newUOC = await adjustUOC(newCourse, program);

    program.minimumUOC = newUOC;
    return program;
}

// Fix minimum UOC
function adjustUOC(newCourse, program) {
    return new Promise((resolve, reject) => {
        try {
            const existingUOC = parseInt(program.minimumUOC);
            const courseUOC = parseInt(newCourse.Item.credit_points.S);
            const newUOC = existingUOC - courseUOC;

            resolve(newUOC);
        } catch (ex) {
            console.log("EXCEPTION ADJUSTING UOC", ex);
            reject(ex);
        }
    });
}

/*
// Fix minimum UOC
function adjustUOC(newCourse, program) {
    return new Promise((resolve, reject) => {
        try {
            
        } catch (ex) {
            console.log("EXCEPTION ADJUSTING UOC", ex);
            reject(ex);
        }
    });
}
*/