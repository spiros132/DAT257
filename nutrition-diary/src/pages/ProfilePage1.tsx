export default function profilePage1() {
    return (
      <div>
        <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '2px', width: '100%', maxWidth: '100vw' }}>
      <h1 style={{ color: 'grey', fontSize: '14px', marginBottom: '2px' }}>Profile</h1>
      {/* profile content here */}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: 'auto', height: 'auto' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src="/NutritionDiary1.png" alt="Nutrition Diary Logo" style={{ width: '200px', margin: '0 auto', marginBottom: '10px' }} />
        <div style={{ position: 'absolute', top: '120px', left: '41%', transform: 'translateX(-40%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/** Increased space */}
          {/** Left side of the vertical line */}
          <div style={{ marginBottom: '110px' }}></div> {/** add an empty line */}
          
          <h2 style={{ color: 'black', fontSize: '24px', marginBottom: '10px', textAlign: 'left' }}>Profile1</h2> {/** 1st text */}
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            
            {/** 1st button */}
            <div style={{ backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', border: '2px solid black' }}>Button 1</div>
            <span style={{ position: 'absolute', top: '50%', left: '-110%', transform: 'translateY(-50%)' }}>USERNAME</span>
            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px', right: '-20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.293 0.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-.39.242l-4 1a1 1 0 0 1-1.27-1.27l1-4a1 1 0 0 1 .242-.39l10-10zM11.88 1.364l1.757 1.757-9.9 9.9-1.758-1.757 9.9-9.9z"/>
                <path fillRule="evenodd" d="M5.879 11.121a.5.5 0 0 1-.707 0L2.5 8.707l-1.5 1.5v-3.536l4.95-4.95a1 1 0 0 1 1.415 0l3.536 3.536a1 1 0 0 1 0 1.415l-4.95 4.95zm1.414 1.414l3.536 3.536a1 1 0 0 0 1.415 0l1.949-1.949 1.01-4.04-4.04-1.01-1.949 1.95a1 1 0 0 0 0 1.414l3.536 3.536a.5.5 0 0 0 .707 0l4.95-4.95a1 1 0 0 0 0-1.415l-3.536-3.535a.5.5 0 0 0-.708 0l-4.95 4.95a1 1 0 0 0 0 1.415z"/>
              </svg>
            </button>
          </div>
          {/** 2nd button */}
          <div style={{ position: 'relative', marginBottom: '10px' }}>
          <div style={{ backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', border: '2px solid black' }}>Button 2</div>
            <span style={{ position: 'absolute', top: '50%', left: '-110%', transform: 'translateY(-50%)' }}>PASSWORD</span>
            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px', right: '-20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.293 0.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-.39.242l-4 1a1 1 0 0 1-1.27-1.27l1-4a1 1 0 0 1 .242-.39l10-10zM11.88 1.364l1.757 1.757-9.9 9.9-1.758-1.757 9.9-9.9z"/>
                <path fillRule="evenodd" d="M5.879 11.121a.5.5 0 0 1-.707 0L2.5 8.707l-1.5 1.5v-3.536l4.95-4.95a1 1 0 0 1 1.415 0l3.536 3.536a1 1 0 0 1 0 1.415l-4.95 4.95zm1.414 1.414l3.536 3.536a1 1 0 0 0 1.415 0l1.949-1.949 1.01-4.04-4.04-1.01-1.949 1.95a1 1 0 0 0 0 1.414l3.536 3.536a.5.5 0 0 0 .707 0l4.95-4.95a1 1 0 0 0 0-1.415l-3.536-3.535a.5.5 0 0 0-.708 0l-4.95 4.95a1 1 0 0 0 0 1.415z"/>
              </svg>
            </button>
          </div>
          <div style={{ position: 'relative', marginBottom: '10px' }}>
          <div style={{ backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', border: '2px solid black' }}>Button 3</div>
            <span style={{ position: 'absolute', top: '50%', left: '-110%', transform: 'translateY(-50%)' }}>HEIGHT</span>

            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px', right: '-20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.293 0.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-.39.242l-4 1a1 1 0 0 1-1.27-1.27l1-4a1 1 0 0 1 .242-.39l10-10zM11.88 1.364l1.757 1.757-9.9 9.9-1.758-1.757 9.9-9.9z"/>
                <path fillRule="evenodd" d="M5.879 11.121a.5.5 0 0 1-.707 0L2.5 8.707l-1.5 1.5v-3.536l4.95-4.95a1 1 0 0 1 1.415 0l3.536 3.536a1 1 0 0 1 0 1.415l-4.95 4.95zm1.414 1.414l3.536 3.536a1 1 0 0 0 1.415 0l1.949-1.949 1.01-4.04-4.04-1.01-1.949 1.95a1 1 0 0 0 0 1.414l3.536 3.536a.5.5 0 0 0 .707 0l4.95-4.95a1 1 0 0 0 0-1.415l-3.536-3.535a.5.5 0 0 0-.708 0l-4.95 4.95a1 1 0 0 0 0 1.415z"/>
              </svg>
            </button>
          </div>
          <div style={{ position: 'relative', marginBottom: '10px' }}>
          <div style={{ backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', border: '2px solid black' }}>Button 4</div>
            <span style={{ position: 'absolute', top: '50%', left: '-110%', transform: 'translateY(-50%)' }}>WEIGHT</span>

            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px', right: '-20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.293 0.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-.39.242l-4 1a1 1 0 0 1-1.27-1.27l1-4a1 1 0 0 1 .242-.39l10-10zM11.88 1.364l1.757 1.757-9.9 9.9-1.758-1.757 9.9-9.9z"/>
                <path fillRule="evenodd" d="M5.879 11.121a.5.5 0 0 1-.707 0L2.5 8.707l-1.5 1.5v-3.536l4.95-4.95a1 1 0 0 1 1.415 0l3.536 3.536a1 1 0 0 1 0 1.415l-4.95 4.95zm1.414 1.414l3.536 3.536a1 1 0 0 0 1.415 0l1.949-1.949 1.01-4.04-4.04-1.01-1.949 1.95a1 1 0 0 0 0 1.414l3.536 3.536a.5.5 0 0 0 .707 0l4.95-4.95a1 1 0 0 0 0-1.415l-3.536-3.535a.5.5 0 0 0-.708 0l-4.95 4.95a1 1 0 0 0 0 1.415z"/>
              </svg>
            </button>
          </div>
          <div style={{ position: 'relative', marginBottom: '10px' }}>
          <div style={{ backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', border: '2px solid black' }}>Button 5</div>
            <span style={{ position: 'absolute', top: '50%', left: '-110%', transform: 'translateY(-50%)' }}>AGE </span>

            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px', right: '-20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.293 0.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-.39.242l-4 1a1 1 0 0 1-1.27-1.27l1-4a1 1 0 0 1 .242-.39l10-10zM11.88 1.364l1.757 1.757-9.9 9.9-1.758-1.757 9.9-9.9z"/>
                <path fillRule="evenodd" d="M5.879 11.121a.5.5 0 0 1-.707 0L2.5 8.707l-1.5 1.5v-3.536l4.95-4.95a1 1 0 0 1 1.415 0l3.536 3.536a1 1 0 0 1 0 1.415l-4.95 4.95zm1.414 1.414l3.536 3.536a1 1 0 0 0 1.415 0l1.949-1.949 1.01-4.04-4.04-1.01-1.949 1.95a1 1 0 0 0 0 1.414l3.536 3.536a.5.5 0 0 0 .707 0l4.95-4.95a1 1 0 0 0 0-1.415l-3.536-3.535a.5.5 0 0 0-.708 0l-4.95 4.95a1 1 0 0 0 0 1.415z"/>
              </svg>
            </button>
          </div>
          <div style={{ position: 'relative', marginBottom: '10px' }}>
          <div style={{ backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', border: '2px solid black' }}>Button 6</div>
            <span style={{ position: 'absolute', top: '50%', left: '-110%', transform: 'translateY(-50%)' }}>GENDER</span>

            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px', right: '-20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.293 0.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-.39.242l-4 1a1 1 0 0 1-1.27-1.27l1-4a1 1 0 0 1 .242-.39l10-10zM11.88 1.364l1.757 1.757-9.9 9.9-1.758-1.757 9.9-9.9z"/>
                <path fillRule="evenodd" d="M5.879 11.121a.5.5 0 0 1-.707 0L2.5 8.707l-1.5 1.5v-3.536l4.95-4.95a1 1 0 0 1 1.415 0l3.536 3.536a1 1 0 0 1 0 1.415l-4.95 4.95zm1.414 1.414l3.536 3.536a1 1 0 0 0 1.415 0l1.949-1.949 1.01-4.04-4.04-1.01-1.949 1.95a1 1 0 0 0 0 1.414l3.536 3.536a.5.5 0 0 0 .707 0l4.95-4.95a1 1 0 0 0 0-1.415l-3.536-3.535a.5.5 0 0 0-.708 0l-4.95 4.95a1 1 0 0 0 0 1.415z"/>
              </svg>
            </button>
          </div>
          

        </div>
        <div style={{ position: 'absolute', top: '120px', left: '55%', transform: 'translateX(-40%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/** mirror section */}
        <div style={{ marginBottom: '120px' }}></div>
          <h2 style={{ color: 'black', fontSize: '24px', marginBottom: '10px' }}>Target</h2> {/** Added text */}
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <button style={{ backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', position: 'relative' }}>Button 1</button>
            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px', right: '-20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.293 0.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-.39.242l-4 1a1 1 0 0 1-1.27-1.27l1-4a1 1 0 0 1 .242-.39l10-10zM11.88 1.364l1.757 1.757-9.9 9.9-1.758-1.757 9.9-9.9z"/>
                <path fillRule="evenodd" d="M5.879 11.121a.5.5 0 0 1-.707 0L2.5 8.707l-1.5 1.5v-3.536l4.95-4.95a1 1 0 0 1 1.415 0l3.536 3.536a1 1 0 0 1 0 1.415l-4.95 4.95zm1.414 1.414l3.536 3.536a1 1 0 0 0 1.415 0l1.949-1.949 1.01-4.04-4.04-1.01-1.949 1.95a1 1 0 0 0 0 1.414l3.536 3.536a.5.5 0 0 0 .707 0l4.95-4.95a1 1 0 0 0 0-1.415l-3.536-3.535a.5.5 0 0 0-.708 0l-4.95 4.95a1 1 0 0 0 0 1.415z"/>
              </svg>
            </button>
          </div>
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <button style={{ backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', position: 'relative' }}>Button 2</button>
            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px', right: '-20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.293 0.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-.39.242l-4 1a1 1 0 0 1-1.27-1.27l1-4a1 1 0 0 1 .242-.39l10-10zM11.88 1.364l1.757 1.757-9.9 9.9-1.758-1.757 9.9-9.9z"/>
                <path fillRule="evenodd" d="M5.879 11.121a.5.5 0 0 1-.707 0L2.5 8.707l-1.5 1.5v-3.536l4.95-4.95a1 1 0 0 1 1.415 0l3.536 3.536a1 1 0 0 1 0 1.415l-4.95 4.95zm1.414 1.414l3.536 3.536a1 1 0 0 0 1.415 0l1.949-1.949 1.01-4.04-4.04-1.01-1.949 1.95a1 1 0 0 0 0 1.414l3.536 3.536a.5.5 0 0 0 .707 0l4.95-4.95a1 1 0 0 0 0-1.415l-3.536-3.535a.5.5 0 0 0-.708 0l-4.95 4.95a1 1 0 0 0 0 1.415z"/>
              </svg>
            </button>
          </div>
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <button style={{ backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', position: 'relative' }}>Button 3</button>
            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px', right: '-20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.293 0.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-.39.242l-4 1a1 1 0 0 1-1.27-1.27l1-4a1 1 0 0 1 .242-.39l10-10zM11.88 1.364l1.757 1.757-9.9 9.9-1.758-1.757 9.9-9.9z"/>
                <path fillRule="evenodd" d="M5.879 11.121a.5.5 0 0 1-.707 0L2.5 8.707l-1.5 1.5v-3.536l4.95-4.95a1 1 0 0 1 1.415 0l3.536 3.536a1 1 0 0 1 0 1.415l-4.95 4.95zm1.414 1.414l3.536 3.536a1 1 0 0 0 1.415 0l1.949-1.949 1.01-4.04-4.04-1.01-1.949 1.95a1 1 0 0 0 0 1.414l3.536 3.536a.5.5 0 0 0 .707 0l4.95-4.95a1 1 0 0 0 0-1.415l-3.536-3.535a.5.5 0 0 0-.708 0l-4.95 4.95a1 1 0 0 0 0 1.415z"/>
              </svg>
            </button>
          </div>
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <button style={{ backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '5px', position: 'relative' }}>Button 4</button>
            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px', right: '-20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.293 0.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-.39.242l-4 1a1 1 0 0 1-1.27-1.27l1-4a1 1 0 0 1 .242-.39l10-10zM11.88 1.364l1.757 1.757-9.9 9.9-1.758-1.757 9.9-9.9z"/>
                <path fillRule="evenodd" d="M5.879 11.121a.5.5 0 0 1-.707 0L2.5 8.707l-1.5 1.5v-3.536l4.95-4.95a1 1 0 0 1 1.415 0l3.536 3.536a1 1 0 0 1 0 1.415l-4.95 4.95zm1.414 1.414l3.536 3.536a1 1 0 0 0 1.415 0l1.949-1.949 1.01-4.04-4.04-1.01-1.949 1.95a1 1 0 0 0 0 1.414l3.536 3.536a.5.5 0 0 0 .707 0l4.95-4.95a1 1 0 0 0 0-1.415l-3.536-3.535a.5.5 0 0 0-.708 0l-4.95 4.95a1 1 0 0 0 0 1.415z"/>
              </svg>
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <button style={{ backgroundColor: 'lightgreen', color: 'black', padding: '10px', borderRadius: '5px', position: 'relative' }}>Button 5</button>
            <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', position: 'absolute', top: '-20px', right: '-20px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.293 0.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-.39.242l-4 1a1 1 0 0 1-1.27-1.27l1-4a1 1 0 0 1 .242-.39l10-10zM11.88 1.364l1.757 1.757-9.9 9.9-1.758-1.757 9.9-9.9z"/>
                <path fillRule="evenodd" d="M5.879 11.121a.5.5 0 0 1-.707 0L2.5 8.707l-1.5 1.5v-3.536l4.95-4.95a1 1 0 0 1 1.415 0l3.536 3.536a1 1 0 0 1 0 1.415l-4.95 4.95zm1.414 1.414l3.536 3.536a1 1 0 0 0 1.415 0l1.949-1.949 1.01-4.04-4.04-1.01-1.949 1.95a1 1 0 0 0 0 1.414l3.536 3.536a.5.5 0 0 0 .707 0l4.95-4.95a1 1 0 0 0 0-1.415l-3.536-3.535a.5.5 0 0 0-.708 0l-4.95 4.95a1 1 0 0 0 0 1.415z"/>
              </svg>
            </button>
          </div>
        </div> {/* marginbottom is to create a space between buttons, then next button with the top -20 is for the pen button, 'translateY(-50%)' makes the text aligned vertically with each button*/}
        <div style={{ position: 'absolute', top: '250px', left: '50%', width: '1px', height: '50%', backgroundColor: 'grey' }}></div> {/** vertical line */}
      </div>
    </div>
        




      </div>
    );
  }
  