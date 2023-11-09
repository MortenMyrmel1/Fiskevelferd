// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsBAKwiSSY9-tsFRPbW1lY4EuGPG2qmE4",
    authDomain: "fiskevelferd.firebaseapp.com",
    projectId: "fiskevelferd",
    storageBucket: "fiskevelferd.appspot.com",
    messagingSenderId: "403055230728",
    appId: "1:403055230728:web:419b6ab21bba9feba7b6bd",
    measurementId: "G-ME4HX45M23"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Hent Firestore-database
const db = firebase.firestore();

// Hent Firestore-dokumentet som inneholder array-data
const docRef = db.collection("Svømmemønster").doc("fart0");
const docRef2 = db.collection("Lus_data").doc("lus_status0");



// Hent data fra Firestore-dokumentet
docRef.get().then((doc) => {
    if (doc.exists) {
        const data = doc.data();

        // Funksjoner for å hente data fra arrayer
        const array1 = data.blueFish;
        const array2 = data.blueTime;
        const array3 = data.redFish;
        const array4 = data.redTime;

        // Opprett canvas-elementer
        const graph1Canvas = document.getElementById("graph1");
        const graph2Canvas = document.getElementById("graph2");

        // Opprett grafer
        const graph1 = new Chart(graph1Canvas, {
            type: 'line',
            data: {
                labels: array2.map((value, index) => (value).toFixed(2) + "s"), // Konverter til sekunder og legg til "s" for tidsenheter
                datasets: [{
                    label: 'Blå laks sin fart (pixels/sekund)', // Legg til enhet
                    data: array1,
                    borderColor: 'blue',
                    fill: false,
                }],
            },
            options: {
                scales: {
                    x: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Tid (s)', // Change to 'Tid (s)'
                        },
                    }],
                    y: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Fart (piksler/s)', // Change to 'Fart (piksler/s)'
                        },
                    }],
                },                
                legend: {
                    display: true,
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
            },
        });
        
        const graph2 = new Chart(graph2Canvas, {
            type: 'line',
            data: {
                labels: array4.map((value, index) => (value).toFixed(2) + "s"), // Konverter til sekunder
                datasets: [{
                    label: 'Rød fisk sin fart (pixels/sekund)',
                    data: array3,
                    borderColor: 'red',
                    fill: false,
                }],
            },
            options: {
                scales: {
                    x: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Tid (s)', // Change to 'Tid (s)'
                        },
                    }],
                    y: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Fart (piksler/s)', // Change to 'Fart (piksler/s)'
                        },
                    }],
                },                
                legend: {
                    display: true,
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
            },
        });                                        
    } else {
        console.log("Dokumentet eksisterer ikke.");
    }

}).catch((error) => {
    console.error("Feil ved henting av dokument:", error);
});

// Hent data fra Firestore-dokumentet
docRef2.get().then((docu) => {
    if (docu.exists) {
        const data2 = docu.data();

        // Funksjoner for å hente data fra arrayer
        const array5 = data2.lus_status;
        const array6 = data2.lus_tid;

        // Opprett canvas-elementer
        const graph3Canvas = document.getElementById("graph3");

        // Opprett grafer
        const graph3 = new Chart(graph3Canvas, {
            type: 'line',
            data: {
                labels: array6.map((value, index) => (value).toFixed(2) + "s"), // Konverter til sekunder og legg til "s" for tidsenheter
                datasets: [{
                    label: 'Antall lus',
                    data: array5,
                    borderColor: 'blue',
                    fill: false,
                }],
            },
            options: {
                scales: {
                    x: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Tid (s)', // Change to 'Tid (s)'
                        },
                    }],
                    y: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'lus', 
                        },
                    }],
                },                
                legend: {
                    display: true,
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
            },
        });                                   
    } else {
        console.log("Dokumentet eksisterer ikke.");
    }

}).catch((error) => {
    console.error("Feil ved henting av dokument:", error);
});
