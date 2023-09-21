const React = require("react");
const myStyle = {
    color: '#ffffff',
    backgroundColor: '#33FF82',
    };


    class Show extends React.Component {
        render() {
            const { pokemon } = this.props;
          return (
            <div style={myStyle}>
              <h1>Gotta Catch 'Em All</h1>
       
                    <h2>{pokemon.name} </h2>
                    <br></br>
                    <img src={pokemon.img + ".jpg"} ></img>
                    <br></br>
                    <br></br>
                    <h1><a href="/pokemon">Back</a></h1>

            </div>
          );
        }
      }
      module.exports = Show;