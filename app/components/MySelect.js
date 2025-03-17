import Select from "react-select";

export default function MySelect(props) {
    const { entrants } = props;

    const darkStyles = {
        container: (provided) => ({
          ...provided,
          backgroundColor: '#222',
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px'
        }),
        control: (provided, state) => ({
          ...provided,
          backgroundColor: '#333',
          color: '#fff',
          border: state.isFocused ? '1px solid white' : '1px solid rgb(171, 62, 255)',
          boxShadow: 'none',
          '&:hover': {
          border: '1px solid white',
          },
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px'
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: '#333',
          color: '#fff',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? '#555' : '#333',
          color: '#fff',
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#fff',
        }),
        input: (provided) => ({
          ...provided,
          color: '#fff',
        })
    }

    return (
        <Select
            className="w-4/5 inline-block text-xl h-10 pl-2"
            options={entrants}
            styles={darkStyles}
            placeholder="Search for someone's tag..."
            name="playerName"
        />
    )
}
