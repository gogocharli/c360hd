export function Spinner() {
  return (
    <>
      <div id='loading-spinner'>
        <svg
          width='86'
          height='86'
          viewBox='0 0 86 86'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M86 43A43 43 0 1164.664 5.856l-.953 1.634A41.109 41.109 0 1084.11 43H86z'
            fill='url(#paint0_linear)'
          />
          <defs>
            <linearGradient
              id='paint0_linear'
              x1='79.874'
              y1='1.479'
              x2='62.965'
              y2='58.695'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#6EE5F7' />
              <stop offset='.067' stop-color='#6DE4F7' />
              <stop offset='.133' stop-color='#6AE1F7' />
              <stop offset='.2' stop-color='#65DBF7' />
              <stop offset='.267' stop-color='#5FD4F6' />
              <stop offset='.333' stop-color='#56CAF5' />
              <stop offset='.4' stop-color='#4CBEF4' />
              <stop offset='.467' stop-color='#41B1F3' />
              <stop offset='.533' stop-color='#35A4F2' />
              <stop offset='.6' stop-color='#2A97F1' />
              <stop offset='.667' stop-color='#208BF0' />
              <stop offset='.733' stop-color='#1781EF' />
              <stop offset='.8' stop-color='#107AEF' />
              <stop offset='.867' stop-color='#0C74EE' />
              <stop offset='.933' stop-color='#0971EE' />
              <stop offset='1' stop-color='#0870EE' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0);
          }

          to {
            transform: rotate(1turn);
          }
        }

        div {
          background-color: hsl(var(--color-dark-main));
          border-radius: 0.5rem;
          box-shadow: 0px 0px 7.67386px 3.06954px rgba(194, 228, 255, 0.3),
            -11.5108px 11.5108px 46.0432px rgba(0, 18, 43, 0.5),
            11.5108px -11.5108px 29.9281px rgba(0, 28, 67, 0.5);
          position: absolute;
          height: 200px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
        }

        svg {
          --svg-size: 86px;
          --parent-size: 200px;
          animation: 2s infinite linear both spin;
          margin: calc((var(--parent-size) - var(--svg-size)) / 2);
        }
      `}</style>
    </>
  );
}
