
var bodyParser = require("body-parser");
const express = require("express");
var cors = require("cors");
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const pg = require("knex")({
     client: "pg",
     connection: {
       connectionString: "postgres://employess_user:M9JGS1JB0es3dbv1uH2kSGvHZX5uzQco@dpg-co1vg4ta73kc73cfp7u0-a.oregon-postgres.render.com/employess",
       host: "dpg-co1vg4ta73kc73cfp7u0-a.oregon-postgres.render.com",
       port: 5432,
       user: "employess_user",
       database: "employess",
       password: "M9JGS1JB0es3dbv1uH2kSGvHZX5uzQco",
       ssl: true,
     },
});

  app.post("/api/addDepartment", async (req, res) => {
    try {
        const currentDate = new Date();
        const { id, departmentId, name } = req.body;
        await pg('Department').insert({
            departmentId: departmentId, 
            name: name,
            createdOn: currentDate
        });
        res.status(200).json({ message: "Department added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while adding the employee" });
    }
});

app.post("/api/addEmployee", async (req, res) => {
    try {
        const currentDate = new Date();
        const { id, fName, employeeId, lName, departmentID, age } = req.body;
        await pg('Employees').insert({
            employeeId: employeeId, 
            lName: lName,
            fName: fName,
            departmentID: departmentID,
            onBoardDate: currentDate,
            age: age
        });
        res.status(200).json({ message: "Employee added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while adding the employee" });
    }
});

app.get('/api/findEmployee/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;
    let empArr = []
    try {
      const employee = await pg('Employees').where({ employeeId: employeeId }).first();
      if (employee) {
        empArr.push(employee)
        res.json(empArr);
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/getDepartment/:departmentId', async (req, res) => {
    const departmentId = req.params.departmentId;
    let deprtArr = []
    try {
      const deprtId = await pg('Department').where({ departmentId: departmentId }).first();
      if (deprtId) {
        deprtArr.push(deprtId)
        res.json(deprtArr);
      } else {
        res.status(404).json({ message: 'Department not found' });
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post("/api/addProject", async (req, res) => {
    try {
        const currentDate = new Date();
        const { id, projectId, name } = req.body;
        await pg('Projects').insert({
            projectId: projectId, 
            name: name,
            startedOn: currentDate
        });
        res.status(200).json({ message: "Project added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while adding the employee" });
    }
});

app.get('/api/findProject/:projectId', async (req, res) => {
    const projectId = req.params.projectId;
    let projArr = []
    let obj;
    try {
      const proId = await pg('Employee_project_track').where({ projectId: projectId }).first();
      const user = await pg('Employees').where({employeeId: proId.employeeId})
      user.forEach(e=>{
                const employeeName = e.fName + " " + e.lName;
                    obj = {
                        employeeId: proId.employeeId,
                        employeeName: employeeName,
                        projectId: proId.projectId,
                        projectName: "xyz",
                        WorkingFrom: proId.joined
                      };
            })
      if (obj) {
        projArr.push(obj)
        res.json(projArr);
      } else {
        res.status(404).json({ message: 'Department not found' });
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.post('/api/employees', async (req, res) => {
    try {
        const { startDate, endDate, projectId } = req.body;

        const employees = await pg('Employee_project_track')
            .where('joined', '>=', startDate)
            .where('exit', '<', endDate)
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});