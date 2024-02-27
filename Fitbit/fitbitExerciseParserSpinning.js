const fs = require('fs');
const path = require('path');

const currentDirectory = process.cwd(); // Get the current working directory

fs.readdir(currentDirectory, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const exerciseFiles = files.filter(file => {
        return file.startsWith('exercise') && file.endsWith('.json');
    });

    var minutes = 0;
    var count = 0;
    var year2022Minutes = 0;
    var year2023Minutes = 0;
    var year2024Minutes = 0;

    var count2022 = 0;
    var count2023 = 0;
    var count2024 = 0;

    let strings = [];

    console.log('Exercise files found:');
    exerciseFiles.forEach(file => {
        console.log(`Processing file: ${file}`);
        fs.readFile(path.join(currentDirectory, file), 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err);
                return;
            }
            try {
                const array = JSON.parse(data);
                let dateStart, dateEnd;
                array.forEach((object, index) => {
                    const date = new Date(object.startTime);
                    if(dateStart == null) dateStart = date;
                    dateEnd = date;
                    if (object.activityName !== "Spinning") {
                        // console.log("Skipping not spinning");
                        return;
                    }
                    // console.log("Processing spinning");
                    const curMinutes = object.activeDuration/60000
                    minutes += curMinutes;
                    count++;
                    console.log("Duration in minutes: ", curMinutes);
                    console.log(date);
                    if(date.getFullYear() == "2022"){
                        year2022Minutes+=curMinutes;
                        count2022++;
                    }
                    if(date.getFullYear() == "2023"){
                        year2023Minutes+=curMinutes;
                        count2023++;
                    }
                    if(date.getFullYear() == "2024"){
                        year2024Minutes+=curMinutes;
                        count2024++;
                    }
                    // console.log("count: ", count);
                });
                strings.push(`${file} Start: ${dateStart}, End: ${dateEnd}`);
            } catch (error) {
                console.error(`Error parsing JSON in file ${file}:`, error);
            }
            console.log(`Finished file: ${file}`);
            console.log("Hours of spinning: ", minutes/60);
            console.log("HOURS 2022: %s, 2023: %s, 2024: %s", year2022Minutes/60, year2023Minutes/60, year2024Minutes/60);
            console.log("EXERCISE COUNTS 2022: %s, 2023: %s, 2024: %s", count2022, count2023, count2024);
            strings.sort();
            strings.forEach(item => {
                // console.log(item);
            });
        });
    });
   
});