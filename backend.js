const express = require('express')
const app = express()
const port = 3000;
const cors = require('cors')
var bodyParser = require('body-parser')
const { department, employees, projects, Employee_project_track } = require('./employess');

app.use(cors())
app.use(bodyParser.json())


  app.post('/api/addEmployee', (req, res) => {
    try {
      const newEmployee = req.body;
      if (!newEmployee || Object.keys(newEmployee).length === 0) {
        return res.status(400).json({ error: "Employee data is required" });
      }
      department.push(newEmployee);
      res.json(department);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

  app.post('/api/project', (req, res) => {
    try {
      const newProject = req.body;
      if (!newProject || Object.keys(newProject).length === 0) {
        return res.status(400).json({ error: "Project data is required" });
      }
      projects.push(newProject);
      res.json(projects);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get('/api/findEmp', (req, res) => {
    try {
      const employeeId = req.query.employeeId;
      if (!employeeId) {
        return res.status(400).json({ error: "Employee ID is required" });
      }
      const foundEmployees = employees.filter(employee => employee.employeeId == employeeId);
  
      if (foundEmployees.length === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json(foundEmployees);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get('/api/department/:departmentId', (req, res) => {
    try {
      const departmentId = req.params.departmentId;
      const departmentDetails = department.filter(entry => entry.departmentId == departmentId);
  
      if (departmentDetails.length === 0) {
        res.status(404).json({ error: "Department not found" });
      } else {
        res.json(departmentDetails);
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get('/api/workingOnProject/:projectId', (req, res) => {
    try {
      const projectId = req.params.projectId;
      const localArr = [];
  
      Employee_project_track.forEach(entry => {
        if (entry.projectId == projectId) {
          const employee = employees.find(emp => emp.employeeId == entry.employeeId);
          if (employee) {
            const employeeName = employee.fName + " " + employee.lName;
            const obj = {
              employeeId: entry.employeeId,
              employeeName: employeeName,
              projectId: entry.projectId,
              projectName: "xyz",
              WorkingFrom: entry.joined
            };
            localArr.push(obj);
          }
        }
      });
  
      if (localArr.length === 0) {
        res.status(404).json({ error: "No employees found for the given project ID" });
      } else {
        res.json(localArr);
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.get('/api/employees', (req, res) => {
    const { projectId, startDate, endDate } = req.query;
  
    if (!projectId || !startDate || !endDate) {
      return res.status(400).json({ error: "projectId, startDate, and endDate are required query parameters" });
    }
  
    const employeesInPeriod = Employee_project_track.filter(entry => {
      return entry.projectId === projectId &&
             isWithinPeriod(entry.joined, startDate, endDate) &&
             isWithinPeriod(entry.exit, startDate, endDate);
    });
  
    res.json(employeesInPeriod);
  });
  
  function isWithinPeriod(date, startDate, endDate) {
    const currentDate = new Date(date);
    const periodStartDate = new Date(startDate);
    const periodEndDate = new Date(endDate);
  
    return currentDate >= periodStartDate && currentDate <= periodEndDate;
  }

  app.get('/api/average-age', (req, res) => {
    try {
      let avgAges = [];
  
      department.forEach(dept => {
        const employeesInDept = employees.filter(emp => emp.departmentID === dept.departmentId);
        const totalAge = employeesInDept.reduce((acc, emp) => acc + emp.age, 0);
        const avgAge = employeesInDept.length > 0 ? totalAge / employeesInDept.length : 0;
  
        avgAges.push({
          departmentId: dept.departmentId,
          departmentName: dept.name,
          avg_age: avgAge
        });
      });
  
      res.json(avgAges);
    } catch (error) {
      console.error('Error calculating average age:', error);
      res.status(500).json({ error: 'An error occurred while calculating average age.' });
    }
  });
  
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})