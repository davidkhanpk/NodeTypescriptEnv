const world = 'world';

interface Employee {
    uniqueId: number;
    name: string;
    subordinates: Employee[];
}

interface IEmployeeOrgApp {
    ceo: Employee;
    /**
    * Moves the employee with employeeID (uniqueId) under a supervisor
    (another employee) that has supervisorID (uniqueId).
    * E.g. move Bob (employeeID) to be subordinate of Georgina
    (supervisorID). * @param employeeID
    * @param supervisorID
    */
    move(employeeID: number, supervisorID: number): void;
    /** Undo last move action */
    undo(): void;
    /** Redo last undone action */
    redo(): void;
}

const ceo = { // sample data
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
                                            subordinates: [
                                                
                                            ]
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
                {
                    name: "Sophie Turner:",
                    uniqueId: 124,
                    subordinates: []
                },
            ]
        }
    ]
}

class EmployeeOrgApp implements IEmployeeOrgApp {
    ceo: Employee;
    undoStack: [number, number][] = [];
    redoStack: [number, number][] = [];
    constructor(ceo: Employee) {
        this.ceo = ceo;
    }

    private recursion(ceo: Employee, findID: number, treeIndexes: number[]): number[] {
        let findIndex = ceo.subordinates.findIndex(x => x.uniqueId == findID); // find index of employee | supervisor from subordinates
        if(findIndex > -1) {
            treeIndexes.push(findIndex);
            return treeIndexes; // index found - no need to continue
        }
        ceo.subordinates.every((sub, i) => { // run loop for every subordinate
            if(sub.subordinates && sub.subordinates.length) {
                treeIndexes.push(i);
                let prevLength = treeIndexes.length
                let newIndexes = this.recursion(sub, findID,  treeIndexes);   
                if(newIndexes) {
                    treeIndexes = newIndexes
                }
                if(newIndexes.length <= prevLength) {
                    // index not found - current array item pop
                    treeIndexes.pop()
                } else {
                    // index found - every loop break
                    return false
                }
                
            }
            return true
        })
        return treeIndexes
    }
    
    move(employeeID: number, supervisorID: number): void {
        this.undoStack.push([employeeID, supervisorID]);
        let employeeIndex = this.recursion(this.ceo, employeeID, [])
        let supervisorIndex = this.recursion(this.ceo, supervisorID, [])
        console.log(`Emplyee Index Location in tree- ${employeeIndex}`)
        console.log(`Supervisor Index Location in tree- ${supervisorIndex}`)
    }
    undo(): void {
        if(this.undoStack.length) { // if any undo element in stack
            let employeeID = this.undoStack[this.undoStack.length - 1][0]
            let supervisorID = this.undoStack[this.undoStack.length - 1][1]
            this.undoStack.splice(this.undoStack.length - 1, 1)
            this.move(employeeID, supervisorID)
            this.redoStack.push([employeeID, supervisorID])
        }
    }
    redo(): void {
        if(this.redoStack.length) { // if any redo element in stack
            let employeeID = this.redoStack[this.redoStack.length - 1][0]
            let supervisorID = this.redoStack[this.redoStack.length - 1][1]
            this.redoStack.splice(this.redoStack.length - 1, 1)
            this.move(employeeID, supervisorID)
        }
    }
}

const app = new EmployeeOrgApp(ceo);
app.move(2, 11)