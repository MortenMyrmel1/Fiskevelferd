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

// Fetch swimming pattern data
docRef.get().then((doc) => {
  if (doc.exists) {
    const data = doc.data();

    // Extract data from arrays
    const array1 = data.blueFish;
    const array2 = data.blueTime;
    const array3 = data.redFish;
    const array4 = data.redTime;

    // Plot swimming pattern graphs
    const graph2Canvas = document.getElementById("graph2");

    const graph1Canvas = document.getElementById("graph1");
    const graph1 = new Chart(graph1Canvas, {
      type: 'line',
      data: {
        labels: array2.map((value, index) => (value).toFixed(2) + "s"),
        datasets: [{
          label: 'Blå laks sin fart (pixels/sekund)',
          data: array1,
          borderColor: 'blue',
          fill: false,
        }],
      },
    });

    const graph2 = new Chart(graph2Canvas, {
      type: 'line',
      data: {
        labels: array4.map((value, index) => (value).toFixed(2) + "s"),
        datasets: [{
          label: 'Rød laks sin fart (pixels/sekund)',
          data: array3,
          borderColor: 'red',
          fill: false,
        }],
      },
    });
  } else {
    console.log("Dokumentet eksisterer ikke.");
  }
}).catch((error) => {
  console.error("Feil ved henting av dokument:", error);
});


let combinedLusStatus = [];
let combinedLusTime = [];

for (let i = 0; i < 4; i++) {
  const docRef = db.collection("Lus_data").doc(`lus_status${i}`);

  docRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      combinedLusStatus = combinedLusStatus.concat(data.lus_status);
      combinedLusTime = combinedLusTime.concat(data.lus_tid);

      if (i === 3) {
        const graphCombinedCanvas = document.getElementById("graphCombined");

        const graphCombined = new Chart(graphCombinedCanvas, {
          type: 'line',
          data: {
            labels: combinedLusTime.map((value, index) => (value).toFixed(2) + "s"),
            datasets: [{
              label: 'Antall Lus',
              data: combinedLusStatus,
              borderColor: 'green',
              fill: false,
            }],
          },
          options: {
            scales: {
              x: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Tid (s)',
                },
              }],
              y: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Lus',
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
      }
    } else {
      console.log(`Document lus_status${i} does not exist.`);
    }
  }).catch((error) => {
    console.error(`Error fetching document lus_status${i}:`, error);
  });
}

