"use strict";
const world = 'world';
const ceo = {
    uniqueId: 1,
    name: "Mark",
    subordinates: [
        {
            name: "Sarah Donald",
            uniqueId: 2,
            subordinates: [
                {
                    name: "Cassandra Reynolds",
                    uniqueId: 3,
                    subordinates: [
                        {
                            name: " Mary Blue",
                            uniqueId: 4,
                            subordinates: []
                        },
                        {
                            name: " Bob Saget",
                            uniqueId: 5,
                            subordinates: [
                                {
                                    name: " Tina Teff",
                                    uniqueId: 13,
                                    subordinates: [
                                        {
                                            name: " Will Turner",
                                            uniqueId: 14,
                                            subordinates: []
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ]
        },
        {
            name: "Tyler Simpson",
            uniqueId: 6,
            subordinates: [
                {
                    name: "Harry Tobs",
                    uniqueId: 7,
                    subordinates: []
                },
                {
                    name: "George Carrey:",
                    uniqueId: 8,
                    subordinates: []
                },
                {
                    name: " Gary Styles",
                    uniqueId: 9,
                    subordinates: []
                },
            ]
        },
        {
            name: "Bruce Willis",
            uniqueId: 10,
            subordinates: []
        },
        {
            name: " Georgina Flangy:",
            uniqueId: 11,
            subordinates: [
                {
                    name: "Sophie Turner:",
                    uniqueId: 12,
                    subordinates: []
                },
            ]
        }
    ]
};
class EmployeeOrgApp {
    constructor(ceo) {
        this.ceo = ceo;
    }
    recursion(ceo, employeeID, supervisorID) {
        let empIndexes = [];
        let supIndexes = [];
        ceo.subordinates.every((sub, i) => {
            // console.log(sub)
            if (sub.uniqueId == employeeID) {
                empIndexes.push(i);
                // return
            }
            if (sub.uniqueId == supervisorID) {
                supIndexes.push(i);
                // return
            }
            if (sub.subordinates.length) {
                this.recursion(sub, employeeID, supervisorID);
            }
            return true;
        });
        console.log(empIndexes, supIndexes);
        return [empIndexes, supIndexes];
    }
    move(employeeID, supervisorID) {
        let empidIndex = -1;
        let supervisorIdIndex = -1;
        this.prevEmployeeID = employeeID;
        this.prevSupervisorID = supervisorID;
        this.recursion(this.ceo, employeeID, supervisorID);
        // this.ceo.subordinates.every((sub, i) => {
        //     if(sub.uniqueId == employeeID) {
        //         empidIndex = i
        //     } else if(sub.uniqueId == supervisorID) {
        //         console.log(sub.uniqueId)
        //         supervisorIdIndex = i
        //     }
        //     if(sub.subordinates.length) {
        //         this.recursion(sub.subordinates, employeeID, supervisorID);
        //     }
        //     return true
        // })
    }
    undo() {
        throw new Error("Method not implemented.");
    }
    redo() {
        throw new Error("Method not implemented.");
    }
}
const app = new EmployeeOrgApp(ceo);
app.move(5, 11);
// console.log(app.ceo.subordinates[3])
