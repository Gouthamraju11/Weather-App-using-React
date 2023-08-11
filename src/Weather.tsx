import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import humidityImage from './assets/images/humidityImage.png';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    card: {
        marginTop: '15%',
        marginRight: '30px',
        marginLeft: '10px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '180px',
        height: '300px',
        borderRadius: '5px',
        boxShadow: '0 0px 10px 5px rgba(9, 55, 238, 0.1), 0 0px 40px 5px rgba(97, 111, 170, 0.2)',
    },
    span: {
        fontSize: '50px',
        fontFamily: 'fantasy',
        textAlign: 'center',
        marginTop: '90px',
        marginLeft: '18px',
    },
    h4: {
        fontSize: '15px',
        fontFamily: 'monospace',
        position: 'absolute',
        bottom: '25px',
        left: '25px',
    },
    h2: {
        fontSize: '15px',
        fontFamily: 'monospace',
        marginTop: '0px',
        textAlign: 'center',
    },
    h3: {
        fontSize: '15px',
        fontFamily: 'cursive',
        position: 'absolute',
        bottom: '25px',
        right: '25px',
    },
    hr: {
        opacity: '0.2',
    },
    h1: {
        marginTop: '20px',
        fontFamily: 'monospace'
    },
    dayName: {
        fontSize: '20px',
        fontFamily: 'fantasy',
        marginTop: "2px"
    },
    dropDown: {
        width: '200px',
        height: '40px',
        margin: 'auto'
    },
    selectOption: {
        fontSize: '25px',
    },
    warmCard: {
        backgroundColor: 'orange', // Example warm color
    },
    coolCard: {
        backgroundColor: 'skyblue', // Example cool color
    },
    icon: {
        width: '30px',
        height: '30px',
        position: 'absolute',
        bottom: '60px',
        right: '30px',
    },
    nextDay: {
        fontSize: '15px',
        fontFamily: 'fantasy',
        position: 'relative',
        right: '48px'
    }
});

const WeatherCards = () => {
    const classes = useStyles();
    const [weatherData, setWeatherData] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState('Kochi');

    const cities = ['Kochi', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai'];

    useEffect(() => {
        const apiKey = '800e47d1cbb8456b897115115232707';

        const fetchData = async () => {
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${selectedCity}&days=7&aqi=no&alerts=no`;
            const response = await fetch(url);
            const data = await response.json();
            setWeatherData(data);
        };

        fetchData();
    }, [selectedCity]);

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div>
            <div className={classes.dropDown}>
                <label className={classes.selectOption} htmlFor="citySelect">Select a City: </label>
                <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            {weatherData && (
                <div className={classes.container}>
                    {weatherData.forecast.forecastday.map((forecastDay: any, index: number) => {
                        const date = new Date(forecastDay.date);
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

                        return (
                            <div
                                className={`${classes.card} ${forecastDay.day.avgtemp_c >= 25 ? classes.warmCard : classes.coolCard
                                    }`}
                                key={index}
                            >
                                <span className={classes.span}>{forecastDay.day.avgtemp_c}&deg;</span>
                                <p className={classes.dayName}>{dayName}</p>
                                <div>
                                    <img src={humidityImage} className={classes.icon} />
                                    <h3 className={classes.h3}>{forecastDay.day.avghumidity}&deg;</h3>
                                </div>
                                <hr className={classes.nextDay} />
                                {index < weatherData.forecast.forecastday.length - 1 && (
                                    <p className={classes.nextDay}>
                                        {new Date(weatherData.forecast.forecastday[index + 1].date).toLocaleDateString('en-US', {
                                            weekday: 'long'
                                        })}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            <h2 className={classes.h1}>{selectedCity}</h2>
        </div>
    );
};

export default WeatherCards;