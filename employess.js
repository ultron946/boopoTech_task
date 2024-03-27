let department = [
    {
        id: 1,
        departmentId: "001",
        name: "john",
        createdOn: "27/2/2024"
    },
    {
        id: 2,
        departmentId: "002",
        name: "Rohan",
        createdOn: "27/3/2024"
    }
]

let employees = [
    {
        id: 1,
        employeeId: "EMP001",
        fName: "John",
        lName: "robert",
        departmentID: "001",
        onBoardDate: "27/3/2024",
        age: 25
    },
    {
        id: 2,
        employeeId: "EMP002",
        fName: "Rohan",
        lName: "Sharma",
        departmentID: "002",
        onBoardDate: "28/3/2024",
        age: 28
    }
]

let projects = [
    {
        id: 1,
        projectId: "PROJ001",
        name: "john",
        startedOn: "02/4/2024"
    }
]

let Employee_project_track = [
    {
        id: 1,
        projectId: "PROJ001",
        employeeId: "EMP001",
        joined: "02/4/2024",
        exit: "10/4/2024"
    },
    {
        id: 2,
        projectId: "PROJ001",
        employeeId: "EMP002",
        joined: "05/4/2024",
        exit: "15/4/2024"
    }
]

module.exports = { department, employees, projects, Employee_project_track };