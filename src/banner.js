import banner from './assets/banner.png';

function Banner() {
  return (
    <div
      className="banner"
      style={{
        color: 'aliceblue',
        width: '100%',
        height: '30%',
        backgroundColor: '#5E17EB',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <img src={banner} alt="banner" />
    </div>
  );
}

export default Banner;
