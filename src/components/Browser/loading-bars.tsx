export function LoadingBars() {
  return (
    <>
      <div className='loading'>
        <div className='bars'>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
        <div className='bars'>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
        <div className='bars'>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
        <div className='bars'>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
        <div className='bars'>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
        <div className='bars'>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes load {
          0% {
            opacity: 0.5;
            transform: translateY(0);
          }

          100% {
            opacity: 1;
            transform: translateY(-5%);
          }
        }

        .loading,
        .bars {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .loading {
          flex-basis: 49%;
          flex-grow: 0;
          height: 85.526%;
        }

        .bars {
          flex-basis: 14.21%;
        }

        .bar {
          animation: 1500ms ease alternate infinite load;
          background-color: hsl(207 100% 88%);
          border-radius: 16px;
          flex-basis: 46.2%;
        }

        .bars > .bar:last-of-type {
          width: 70%;
        }

        .bars:nth-child(1) .bar {
          animation-delay: 0ms;
        }

        .bars:nth-child(2) .bar {
          animation-delay: 100ms;
        }

        .bars:nth-child(2) .bar:first-of-type {
          width: 83%;
        }

        .bars:nth-child(3) .bar {
          animation-delay: 200ms;
        }

        .bars:nth-child(3) .bar:last-of-type {
          width: 25%;
        }

        .bars:nth-child(4) .bar {
          animation-delay: 300ms;
        }

        .bars:nth-child(5) .bar {
          animation-delay: 400ms;
        }

        .bars:nth-child(6) .bar {
          animation-delay: 500ms;
        }
      `}</style>
    </>
  );
}
