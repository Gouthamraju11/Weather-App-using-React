import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';

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
                                    <img src='data:image/webp;base64,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' className={classes.icon} />
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