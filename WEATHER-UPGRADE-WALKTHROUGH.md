# Weather Upgrade Walkthrough

## Goal
Add automatic weather data to ALL planets (not just the 5 featured ones) by mapping each planet's climate type to a real Earth location with similar weather.

---

## How It Works

```
Planet loads → Read climate ("frozen") → Map to Earth location (Oymyakon, Russia) → Fetch real weather → Display
```

---

## Step 1: Update the Service (js/service.js)

Open `js/service.js` in your code editor.

**Find this section at the bottom of the file (around line 90):**
```javascript
  this.coruweather = function() {
    return $http({
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/weather?q=san francisco,US&appid=ca745d64c069805e15fa79364802f256'
    });
  };

});
```

**Add this NEW code BEFORE the final `});`:**

```javascript
  // ============================================
  // CLIMATE-BASED WEATHER (V2 UPGRADE)
  // ============================================

  // Map SWAPI climate values to real Earth locations
  var climateLocations = {
    'arid': { city: 'Phoenix', country: 'US' },
    'desert': { city: 'Cairo', country: 'EG' },
    'frozen': { city: 'Oymyakon', country: 'RU' },
    'arctic': { city: 'Oymyakon', country: 'RU' },
    'tropical': { city: 'Singapore', country: 'SG' },
    'murky': { city: 'Manaus', country: 'BR' },
    'temperate': { city: 'San Francisco', country: 'US' },
    'hot': { city: 'Kuwait City', country: 'KW' },
    'humid': { city: 'Miami', country: 'US' },
    'moist': { city: 'Seattle', country: 'US' },
    'polluted': { city: 'Beijing', country: 'CN' },
    'superheated': { city: 'Kuwait City', country: 'KW' },
    'windy': { city: 'Wellington', country: 'NZ' },
    'frigid': { city: 'Yakutsk', country: 'RU' },
    'rocky': { city: 'Denver', country: 'US' },
    'artificial temperate': { city: 'San Francisco', country: 'US' }
  };

  // Get weather for any planet based on its climate
  this.getWeatherByClimate = function(climateString) {
    // Default location if no match found
    var location = { city: 'London', country: 'GB' };

    // Handle "unknown" climate
    if (!climateString || climateString === 'unknown') {
      location = { city: 'London', country: 'GB' };
    } else {
      // Parse climate string (might be "temperate, tropical")
      var climates = climateString.toLowerCase().split(',');

      // Find first matching climate keyword
      for (var i = 0; i < climates.length; i++) {
        var climate = climates[i].trim();
        if (climateLocations[climate]) {
          location = climateLocations[climate];
          break;
        }
      }
    }

    // Build OpenWeatherMap API URL
    var apiKey = 'ca745d64c069805e15fa79364802f256';
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
              location.city + ',' + location.country +
              '&appid=' + apiKey;

    // Return the HTTP promise
    return $http.get(url);
  };

  // Get Earth location name for display purposes
  this.getEarthLocationName = function(climateString) {
    var locationNames = {
      'arid': 'Phoenix, Arizona',
      'desert': 'Cairo, Egypt',
      'frozen': 'Oymyakon, Russia (coldest inhabited place)',
      'arctic': 'Oymyakon, Russia',
      'tropical': 'Singapore',
      'murky': 'Amazon Rainforest, Brazil',
      'temperate': 'San Francisco, USA',
      'hot': 'Kuwait City, Kuwait',
      'humid': 'Miami, Florida',
      'moist': 'Seattle, Washington',
      'polluted': 'Beijing, China',
      'superheated': 'Kuwait City, Kuwait',
      'windy': 'Wellington, New Zealand',
      'frigid': 'Yakutsk, Russia',
      'rocky': 'Denver, Colorado',
      'artificial temperate': 'San Francisco, USA'
    };

    if (!climateString || climateString === 'unknown') {
      return 'London, UK (default)';
    }

    var climates = climateString.toLowerCase().split(',');
    for (var i = 0; i < climates.length; i++) {
      var climate = climates[i].trim();
      if (locationNames[climate]) {
        return locationNames[climate];
      }
    }
    return 'London, UK (default)';
  };
```

**Save the file.**

---

## Step 2: Update the Planet Controller (js/planetCtrl.js)

Open `js/planetCtrl.js` in your code editor.

**Replace the ENTIRE file contents with this:**

```javascript
angular.module('myApp').controller('planetCtrl', function($scope, $stateParams, service, planetService) {

  // ============================================
  // DYNAMIC PLANET ROUTE (V2 UPGRADE)
  // ============================================

  if ($stateParams.id) {
    $scope.loading = true;
    $scope.weather = null;
    $scope.earthLocation = null;

    // Fetch planet data from SWAPI
    service.getPlanetById($stateParams.id).then(function(response) {
      $scope.planet = response.data;
      console.log('Loaded planet:', $scope.planet.name);

      // Now fetch weather based on the planet's climate
      if ($scope.planet.climate && $scope.planet.climate !== 'unknown') {

        // Get the Earth location name for display
        $scope.earthLocation = service.getEarthLocationName($scope.planet.climate);

        // Fetch actual weather data
        service.getWeatherByClimate($scope.planet.climate).then(function(weatherResponse) {
          $scope.weather = weatherResponse.data;
          console.log('Weather loaded from:', $scope.earthLocation);
          $scope.loading = false;
        }).catch(function(error) {
          console.error('Weather API error:', error);
          $scope.loading = false;
        });

      } else {
        // No climate data available
        console.log('No climate data for this planet');
        $scope.loading = false;
      }

    }).catch(function(error) {
      console.error('Error loading planet:', error);
      $scope.loading = false;
    });
  }

  // ============================================
  // LEGACY METHODS (for featured planet pages)
  // ============================================

  $scope.getTat = function() {
    planetService.getTat().then(function(results) {
      $scope.tatooine = results.data.results[0];
    });
  };
  $scope.getTat();

  $scope.gethoth = function() {
    planetService.gethoth().then(function(results) {
      $scope.hoth = results.data.results[3];
    });
  };
  $scope.gethoth();

  $scope.getDagobah = function() {
    planetService.getDagobah().then(function(results) {
      $scope.Dagobah = results.data.results[4];
    });
  };
  $scope.getDagobah();

  $scope.getmustafar = function() {
    planetService.getmustafar().then(function(results) {
      $scope.mustafar = results.data.results[2];
    });
  };
  $scope.getmustafar();

  // ============================================
  // HELPER: Convert Kelvin to Celsius
  // ============================================
  $scope.kelvinToCelsius = function(kelvin) {
    return (kelvin - 273.15).toFixed(1);
  };

  // HELPER: Convert Kelvin to Fahrenheit
  $scope.kelvinToFahrenheit = function(kelvin) {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(1);
  };

});
```

**Save the file.**

---

## Step 3: Update the Planet Template (views/planet.html)

Open `views/planet.html` in your code editor.

**Replace the ENTIRE file contents with this:**

```html
<link rel="stylesheet" type="text/css" href="./styles/planet.css">

<div class="planet-page">

  <!-- Loading State -->
  <div class="loading" ng-if="loading">
    <h2>Loading planet data...</h2>
    <div class="loader"></div>
  </div>

  <!-- Planet Content -->
  <div class="planet-content" ng-if="!loading && planet">

    <div class="planet-header">
      <a ui-sref="home" class="back-link">← Back to All Planets</a>
      <h1 class="planet-title">{{planet.name}}</h1>
      <p class="planet-climate-tag">{{planet.climate}}</p>
    </div>

    <div class="planet-details">

      <!-- Physical Properties Card -->
      <div class="detail-card">
        <h3>Physical Properties</h3>
        <ul>
          <li><span>Diameter:</span> {{planet.diameter}} km</li>
          <li><span>Gravity:</span> {{planet.gravity}}</li>
          <li><span>Rotation Period:</span> {{planet.rotation_period}} hours</li>
          <li><span>Orbital Period:</span> {{planet.orbital_period}} days</li>
        </ul>
      </div>

      <!-- Environment Card -->
      <div class="detail-card">
        <h3>Environment</h3>
        <ul>
          <li><span>Climate:</span> {{planet.climate}}</li>
          <li><span>Terrain:</span> {{planet.terrain}}</li>
          <li><span>Surface Water:</span> {{planet.surface_water}}%</li>
        </ul>
      </div>

      <!-- Population Card -->
      <div class="detail-card">
        <h3>Population</h3>
        <ul>
          <li><span>Population:</span> {{planet.population}}</li>
          <li><span>Residents:</span> {{planet.residents.length}} known</li>
          <li><span>Films:</span> {{planet.films.length}} appearances</li>
        </ul>
      </div>

      <!-- Weather Card (NEW!) -->
      <div class="detail-card weather-card" ng-if="weather">
        <h3>Live Weather Simulation</h3>
        <p class="weather-note">
          Real-time data from <strong>{{earthLocation}}</strong><br>
          <small>(Earth location with similar climate)</small>
        </p>
        <ul>
          <li>
            <span>Temperature:</span>
            {{kelvinToCelsius(weather.main.temp)}}°C /
            {{kelvinToFahrenheit(weather.main.temp)}}°F
          </li>
          <li><span>Conditions:</span> {{weather.weather[0].description}}</li>
          <li><span>Humidity:</span> {{weather.main.humidity}}%</li>
          <li><span>Pressure:</span> {{weather.main.pressure}} hPa</li>
          <li><span>Wind Speed:</span> {{weather.wind.speed}} m/s</li>
        </ul>
      </div>

      <!-- No Weather Available -->
      <div class="detail-card" ng-if="!weather && planet.climate === 'unknown'">
        <h3>Weather</h3>
        <p class="no-weather">Climate unknown - no weather simulation available</p>
      </div>

    </div>
  </div>

  <!-- Error State -->
  <div class="error" ng-if="!loading && !planet">
    <h2>Planet not found</h2>
    <a ui-sref="home" class="back-link">← Back to All Planets</a>
  </div>

</div>
```

**Save the file.**

---

## Step 4: Update the Planet Styles (styles/planet.css)

Open `styles/planet.css` in your code editor.

**Add this to the END of the file:**

```css
/* ============================================
   WEATHER CARD STYLES (V2 UPGRADE)
   ============================================ */

.weather-card {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 140, 0, 0.1) 100%);
  border-color: rgba(255, 215, 0, 0.5);
}

.weather-note {
  font-size: 0.85rem;
  color: #aaa;
  margin-bottom: 15px;
  line-height: 1.4;
}

.weather-note strong {
  color: #ffd700;
}

.weather-note small {
  font-style: italic;
  color: #888;
}

.no-weather {
  color: #888;
  font-style: italic;
}

.planet-climate-tag {
  color: #888;
  font-size: 1.1rem;
  margin-top: 10px;
  text-transform: capitalize;
}
```

**Save the file.**

---

## Step 5: Test It!

1. Open your terminal/command prompt
2. Navigate to the Star-Wars-Planets folder:
   ```
   cd C:\Users\el_se\Projects\Star-Wars-Planets
   ```
3. Start a local server:
   ```
   npx serve
   ```
4. Open `http://localhost:3000` in your browser
5. Click on any planet in the grid (not the featured 5)
6. You should see a "Live Weather Simulation" card with real weather data!

---

## Understanding the Code

### The Climate Mapping Logic

```javascript
var climateLocations = {
  'frozen': { city: 'Oymyakon', country: 'RU' },
  // ...
};
```

This object maps Star Wars climate types to real Earth cities. When a planet has `climate: "frozen"`, we fetch weather from Oymyakon, Russia (the coldest inhabited place on Earth).

### Parsing Multiple Climates

Some planets have multiple climates like `"temperate, tropical"`. The code splits this by comma and uses the FIRST match:

```javascript
var climates = climateString.toLowerCase().split(',');
for (var i = 0; i < climates.length; i++) {
  var climate = climates[i].trim();
  if (climateLocations[climate]) {
    location = climateLocations[climate];
    break;  // Stop at first match
  }
}
```

### Temperature Conversion

OpenWeatherMap returns temperature in Kelvin. The helper functions convert it:

```javascript
$scope.kelvinToCelsius = function(kelvin) {
  return (kelvin - 273.15).toFixed(1);
};

$scope.kelvinToFahrenheit = function(kelvin) {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(1);
};
```

---

## Troubleshooting

**Weather not showing?**
- Check browser console (F12) for errors
- Make sure the climate isn't "unknown"
- Verify OpenWeatherMap API key is working

**Planet not loading?**
- Check that SWAPI URL is `swapi.py4e.com` (not the old `swapi.dev`)
- Check console for network errors

**Styling looks wrong?**
- Make sure you saved all CSS changes
- Hard refresh the browser (Ctrl+Shift+R)

---

## What You Learned

1. **API Chaining** - Fetching one API, then using that data to call another API
2. **Data Mapping** - Converting one data format to another (climate → location)
3. **Error Handling** - Using `.catch()` to handle failed API calls
4. **Conditional Display** - Using `ng-if` to show/hide elements based on data
5. **Helper Functions** - Creating reusable functions for data conversion

---

## Next Steps (Optional Enhancements)

1. Add more climate mappings as you discover them
2. Add weather icons based on conditions
3. Cache weather data to reduce API calls
4. Add a "refresh weather" button

---

*Walkthrough created January 2026*
