import { Alert, Container } from 'reactstrap';
import { getConcerts, loadConcertsRequest } from '../../../redux/concertsRedux';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'; 


const Prices = () => {
  
  const dispatch = useDispatch();
  const concerts = useSelector(getConcerts);
  console.log('concerts', concerts);

  useEffect(() => {
    dispatch(loadConcertsRequest())
  }, [dispatch]);

  const dayNumber = (day) => {
    if (day === 1) return 'One';
    else if (day === 2) return 'Two';
    else return 'Three'
  }

  return (
    <Container>
    <h1>Prices</h1>
    <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
    <Alert color="info">
        Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
    </Alert>
    {concerts.map((concert) => (
      <div key={concert._id}>
      <h2>Day {dayNumber(concert.day)}</h2>
      <p>Price: {concert.price}$</p>
      <p>Workshops: {concert.workshops.map((workshop) => `"${workshop.name}"`).join(', ')}</p>
      </div>
    ))}
  </Container>
  )  
  };

export default Prices;