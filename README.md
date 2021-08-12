# Datalayer exercise

## Getting started

Before you start this exercise, download and unzip the following repository: [https://github.com/datacharmer/test_db](https://github.com/datacharmer/test_db).
Then navigate to that folder using a terminal. Execute one of the following commands, depending on your OS:

Windows:

```powershell
# Update the username and password (-p option WITHOUT parameter!) according to your config
Get-Content .\employees.sql | mysql -u root
```

Linux/macOS:

```bash
# Update the username and password (-p option WITHOUT parameter!) according to your config
mysql -u root < employees.sql
```

## Exercises

Before getting to the exercises, please have a look at the `examples.js` in each folder. Don't look at the `solution.js` before trying yourself.
The expected output per exercise can be found in the folder `expected_output` (per exercise).
You should go through the exercises in this order:

1. manual
2. querybuilder
2. relational-querybuilder
3. orm

