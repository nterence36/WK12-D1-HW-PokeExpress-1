const React = require("react");
const myStyle = {
    color: '#ffffff',
    backgroundColor: '#33FF82',
    };


    class Index extends React.Component {
        render() {
            const { pokemon } = this.props;
          return (
            <div style={myStyle}>
              <nav>
                <a href="/pokemon/new"><h1>Create New Pokemon</h1></a>
              </nav>
              <h1>See All The Pokemon!</h1>
                <ul>
                    {pokemon.map((pokemon, i) => {
                        return (
                            <li key={i}>
                                <a href={`/pokemon/${pokemon.id}`}>{pokemon.name}</a> 
                                <br></br>
                               
                            </li>
                      )
                    })}
                </ul>

            </div>
          );
        }
      }
      module.exports = Index;
      