(function() {
    'use strict';

    window.saveData = localStorage.getItem('RetroBowl.0.savedata.ini');
    
    const addCredits = (count) => {
        const newSave = window.saveData.replace(/coach_credit="[0-9]+"/g, `coach_credit="${count}"`);
        localStorage.setItem('RetroBowl.0.savedata.ini', newSave);
    }

    const changeSalaryCap = (salary) => {
        const newSave = window.saveData.replace(/salary_cap="[0-9]+"/, `salary_cap="${salary}"`);
        localStorage.setItem('RetroBowl.0.savedata.ini', newSave);
    }

    const changeDraft = (picks) => {
        const newSave = window.saveData.replace(/draft_picks_0="[0-9]+"/, `draft_picks_0="${picks}"`);
        localStorage.setItem('RetroBowl.0.savedata.ini', newSave);
    }

    const changeStadiumLvl = (lvl) => {
        let newSave = window.saveData.replace(/facility_upgraded_stadium="[0-9]+"/, `facility_upgraded_stadium="${lvl}"`);
        newSave = newSave.replace(/facility_stadium="[0-9]+"/, `facility_stadium="${lvl}"`);
        localStorage.setItem('RetroBowl.0.savedata.ini', newSave);
    }

    const changeTrainingLvl = (lvl) => {
        let newSave = window.saveData.replace(/facility_upgraded_training="[0-9]+"/, `facility_upgraded_training="${lvl}"`);
        newSave = newSave.replace(/facility_training="[0-9]+"/, `facility_training="${lvl}"`);
        localStorage.setItem('RetroBowl.0.savedata.ini', newSave);
    }

    const changeRehabLvl = (lvl) => {
        let newSave = window.saveData.replace(/facility_upgraded_rehab="[0-9]+"/, `facility_upgraded_rehab="${lvl}"`);
        newSave = newSave.replace(/facility_rehab="[0-9]+"/, `facility_rehab="${lvl}"`);
        localStorage.setItem('RetroBowl.0.savedata.ini', newSave);
    }

    const injectCtrlBar = () => {
        const body = document.querySelector("body");
        let div = document.createElement("div");
        div.id = "ctrlBar";
        div.style = "background:blue;position:fixed;z-index:1000;top:10px;padding:10px;border-radius:10px;left:50%;transform:translateX(-50%);cursor:move; width: 600px; height: 50px; display: flex; justify-content: space-around; align-items: center;";
        body.appendChild(div);

        // Make the ctrlBar draggable
        let offsetX, offsetY;

        div.addEventListener('mousedown', (e) => {
            offsetX = e.clientX - div.getBoundingClientRect().left;
            offsetY = e.clientY - div.getBoundingClientRect().top;
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });

        const mouseMoveHandler = (e) => {
            div.style.left = `${e.clientX - offsetX}px`;
            div.style.top = `${e.clientY - offsetY}px`;
        };

        const mouseUpHandler = () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
    }

    const createButton = (id, text, callback) => {
        const ctrlBar = document.querySelector("#ctrlBar");
        let btn = document.createElement("button");
        btn.id = id;
        btn.innerText = text;
        btn.style = "width: 120px; height: 30px; white-space: nowrap;"; // Fixed size for buttons
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", callback);
    }

    const injectCreditsBtn = () => {
        createButton("creditsBtn", "Give Me Credits!", () => {
            const newCreditCount = window.prompt("How many credits would you like?");
            if (!isNaN(newCreditCount)) {
                addCredits(newCreditCount);
                window.location.reload();
            }
        });
    }

    const injectSalaryBtn = () => {
        createButton("salaryBtn", "Change Salary Cap!", () => {
            const newSalary = window.prompt("What would you like your new salary cap to be?");
            if (!isNaN(newSalary)) {
                changeSalaryCap(newSalary);
                window.location.reload();
            }
        });
    }

    const injectDraftBtn = () => {
        createButton("draftBtn", "Change Draft Picks", () => {
            const newDraft = window.prompt("How many 1st round draft picks would you like?");
            if (!isNaN(newDraft)) {
                changeDraft(newDraft);
                window.location.reload();
            }
        });
    }

    const injectStadiumBtn = () => {
        createButton("stadiumBtn", "Change Stadium Level", () => {
            const newLvl = window.prompt("What level stadium do you want (0-10)?");
            if (!isNaN(newLvl)) {
                changeStadiumLvl(newLvl);
                window.location.reload();
            }
        });
    }

    const injectTrainingBtn = () => {
        createButton("trainingBtn", "Change Training Facility Level", () => {
            const newLvl = window.prompt("What level training facilities do you want (0-10)?");
            if (!isNaN(newLvl)) {
                changeTrainingLvl(newLvl);
                window.location.reload();
            }
        });
    }

    const injectRehabBtn = () => {
        createButton("rehabBtn", "Change Rehab Facility Level", () => {
            const newLvl = window.prompt("What level rehab facilities do you want (0-10)?");
            if (!isNaN(newLvl)) {
                changeRehabLvl(newLvl);
                window.location.reload();
            }
        });
    }

    const injectInfoBtn = () => {
        createButton("info", "Client info", () => {
            alert(`
            Using RB_Cracker v.2\n
            By Finn Lancaster (edited for gtagusers modded retro)\n
            https://github.com/flancast90 (Star it!)\n
            `);
        });
    };

    const methods = {
        ctrlBar: injectCtrlBar(),
        credits: injectCreditsBtn(),
        salary: injectSalaryBtn(),
        draft: injectDraftBtn(),
        stadium: injectStadiumBtn(),
        training: injectTrainingBtn(),
        rehab: injectRehabBtn(),
        info: injectInfoBtn(),
        addAll: function() {
            for (let method of Object.keys(this).filter(m => m !== "addAll")) this[method];
        }
    }
    methods.addAll();
})();
