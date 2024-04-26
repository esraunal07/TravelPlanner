import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Transport from './models/model-transport.js';
import Accommodation from './models/model-accomodation.js';
import Attraction from './models/model-attractions.js'
import Weather from "./models/model-weather.js";
import Cuisine from "./models/model-cuisine.js";

mongoose.connect('mongodb+srv://gesraunal:esra0789@cluster0.qz4pl3b.mongodb.net/TravelPlanner');
const db = mongoose.connection;

// Generate fake accommodation data
async function generateAccommodationData() {
    try {
        for (let i = 0; i < 10; i++) {
            const newAccommodation = new Accommodation({
                name: faker.company.name(),
                city: faker.location.city(),
                address: faker.location.streetAddress(),
                description: faker.lorem.paragraph()
            });
            await newAccommodation.save();
            console.log('Accommodation data added:', newAccommodation);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Generate fake attraction data
async function generateAttractionData() {
    try {
        for (let i = 0; i < 10; i++) {
            const newAttraction = new Attraction({
                name: faker.company.name(),
                city: faker.location.city(),
                location: faker.location.streetAddress(),
                description: faker.lorem.paragraph(),
                cuisine: faker.lorem.words()
            });
            await newAttraction.save();
            console.log('Attraction data added:', newAttraction);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Generate fake cuisine data
async function generateCuisineData() {
    try {
        for (let i = 0; i < 10; i++) {
            const newCuisine = new Cuisine({
                name: faker.lorem.word(),
                description: faker.lorem.paragraph()
            });
            await newCuisine.save();
            console.log('Cuisine data added:', newCuisine);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Generate fake transport data
async function generateTransportData() {
    try {
        for (let i = 0; i < 10; i++) {
            // "mode" alanını rastgele "Tramway" veya "Taxi" olarak ayarla
            const modeOptions = ["Tramway", "Taxi"];
            const randomMode = modeOptions[Math.floor(Math.random() * modeOptions.length)];

            const newTransport = new Transport({
                mode: randomMode,
                description: faker.lorem.paragraph()
            });
            await newTransport.save();
            console.log('Transport data added:', newTransport);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    // Tüm verileri filtrele
const allTransports = await Transport.find();

// "Tramway" veya "Taxi" moduna sahip olanları filtrele
const filteredTransports = allTransports.filter(transport => {
    return transport.mode === "Tramway" || transport.mode === "Taxi";
});

// Filtrelenmemiş tüm verileri sil
await Transport.deleteMany({ _id: { $nin: filteredTransports.map(transport => transport._id) } });

}


// Generate fake weather data
async function generateWeatherData() {
    try {
        for (let i = 0; i < 10; i++) {
            const newWeather = new Weather({
                location: faker.location.city(),
                temperature: faker.datatype.number(),
                condition: faker.lorem.word()
            });
            await newWeather.save();
            console.log('Weather data added:', newWeather);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


//Call hundreds of data creations
async function generateFakeData() {
    await generateAccommodationData();
    await generateAttractionData();
    await generateCuisineData();
    await generateTransportData();
    await generateWeatherData();
    // Close MongoDB connection
    db.close();
}

//Call fake data creation
generateFakeData();
