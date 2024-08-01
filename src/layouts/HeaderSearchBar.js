import { useEffect, useRef, useState } from "react"
import { Button, ButtonDropdown, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, Row } from "reactstrap"
import useUserSearchWithAutocomplete from "../api/search/useUserSearchWithAutoComplete"
import { useNavigate } from "react-router-dom"

const HeaderSearchBar = () => {
    const [toggle,setToggle] = useState(false)
    const [searchType, setSearchType] = useState('Users')
    const [value, setValue] = useState('')
    const {setPrefix, results} = useUserSearchWithAutocomplete()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
  const searchInputRef = useRef(null);
    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    const handleResultClick = (result) => {
        console.log('Selected result:', result);
        setDropdownOpen(false);
        setValue('')
        navigate(`/users/${result}`)
        // You can add additional logic here, like navigating to a details page
      };
    useEffect(()=>{
        console.log(value)
        if(value.length >0){
            setDropdownOpen(true);

        } else {
            setDropdownOpen(false)
        }
        setPrefix(value)
    }, [value])
return (
    <Container className='text-center justify-content-center'>
        <Row>
        <InputGroup>
        <Input innerRef={searchInputRef} value={value} type="text" placeholder={`Search`} onChange={(e) => handleOnChange(e)}></Input>
      
        
        <ButtonDropdown isOpen={toggle}toggle={handleToggle}>
      <DropdownToggle  caret>
        {searchType}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>
          Search Type
        </DropdownItem>
        <DropdownItem onClick={() =>setSearchType('Users')}>
          Users
        </DropdownItem>
        <DropdownItem onClick={() =>setSearchType('Posts')}>
          Posts
        </DropdownItem>
       
      </DropdownMenu>
    </ButtonDropdown>
    <Button>Search</Button>
  </InputGroup>
  </Row>
  <Row>
  <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
        <DropdownToggle tag="span"/>
        <DropdownMenu>
        <DropdownItem header>Results</DropdownItem>

          {results.map((result, index) => (
            <DropdownItem  key={index} onClick={() => handleResultClick(result)}>
              <h6>{result}</h6>
            </DropdownItem>
          ))}
          {results.length === 0 && (
            <DropdownItem disabled>No results found</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
  </Row>

  </Container>
)
}

export default HeaderSearchBar