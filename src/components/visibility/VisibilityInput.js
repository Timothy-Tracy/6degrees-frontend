import React, { useEffect, useState, useCallback } from "react";
import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import { useDebug } from "../context/DebugContext";

/**
 * @typedef {Object} CheckboxOption
 * @property {string} checkboxLabel - Display label for the checkbox
 * @property {string} checkboxArrayValue - Value to be used in the output array
 */

/**
 * @typedef {Object} SpecialOption
 * @property {string} value - The value of the special option
 * @property {('exclusive'|'alwaysOn'|'none')} behavior - The behavior of the special option
 */

/**
 * @typedef {Object} VisibilityInputProps
 * @property {CheckboxOption[]} options - Array of checkbox options
 * @property {string[]} outputArr - Array of selected visibility options
 * @property {function} setOutputArr - Function to update the outputArr
 * @property {SpecialOption} [specialOption] - Configuration for special option behavior
 */

/**
 * VisibilityInput component for managing visibility options
 * @param {VisibilityInputProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const VisibilityInput = ({
    options = [],
    outputArr = [],
    setOutputArr,
    specialOption = { checkboxLabel: 'Public', value: 'public', behavior: 'exclusive' }
}) => {
    const { debug } = useDebug();

    // Initialize checkbox states
    const [checkboxes, setCheckboxes] = useState(() => {
        let opt = [specialOption]
        opt = [...opt, ...options];
        for (let i = 0; i < opt.length; i++) {
            opt[i].checkboxArrayValue = opt[i].value === specialOption.value
            opt[i].disabled = opt[i].value === specialOption.value || opt[i].behavior === 'alwaysOn'
        }

        console.log(opt)
        return opt

    }

    );

    // Memoized function to get the current state of checkboxes
    const getCheckboxState = useCallback(() => {
        console.log('checkboxes callback', checkboxes)
        return checkboxes
        // return Object.entries(checkboxes)
        //   .filter(([_, value]) => value)
        //   .map(([key]) => key);
    }, [checkboxes]);

    /**
     * Handle checkbox change events
     * @param {string} key - The key of the changed checkbox
     */
    const handleCheckboxChange = useCallback((key) => (e) => {
        setCheckboxes(prev => {
            const newState = prev.map(item => {
                if (item.value !== key) {
                    return item
                } else {
                    return { ...item, checkboxArrayValue: e.target.checked }
                }


            })



            let selectedCheckboxes = newState.filter((element) => element.behavior !== 'exclusive').filter((element) => element.checkboxArrayValue === true)
            debug(`Detected selected boxes = ${selectedCheckboxes.length}\n${selectedCheckboxes.length == 0}`)

            // Handle 'exclusive' behavior
            if (specialOption.behavior === 'exclusive') {

                if (selectedCheckboxes.length == 0) {
                    debug('Case:Nothing selected, reselecting exclusive item')
                    return newState.map((element) => {
                        console.log('nested mpa')
                        if (element.value === specialOption.value) {
                            return { ...element, checkboxArrayValue: true, disabled:true }
                        } else {
                            return element
                        }
                    })
                }
                if (key === specialOption.value) {
                    // If special option is checked, uncheck all others
                    debug('Case: If special option is checked, uncheck all others')
                    return newState.map(item => ({
                            ...item,
                            checkboxArrayValue: item.value === specialOption.value ? e.target.checked : false,
                            disabled: item.value === specialOption.value ? true : false
                        }
                    ));
                } else if (e.target.checked) {
                    debug('Case: If any other option is checked, uncheck special option')
                    // If any other option is checked, uncheck special option
                    return newState.map(item =>
                        item.value === specialOption.value ? { ...item, checkboxArrayValue: false, disabled:false } : item,
                        
                    );
                }
            } else if (specialOption.behavior === 'alwaysOn' && key === specialOption.value) {
                debug('Case:Prevent unchecking of alwaysOn option')
                // Prevent unchecking of 'alwaysOn' option
                return prev;
            }

            if (key !== specialOption.value) {

                console.log('selected checkboxes length', selectedCheckboxes.length)

            }

            return newState;
        });
    }, [specialOption]);
    // Effect to update output array when checkboxes change
    useEffect(() => {
        debug('getCheckboxState effect')
        let newOutputArr = getCheckboxState().filter((element) => {
            debug('mapping')
            console.log(element)
            return (element.checkboxArrayValue === true)

        }).map((element) => element.value);



        setOutputArr(newOutputArr);

        // Log for debugging
        debug(newOutputArr.toString());
    }, [getCheckboxState]);

    return (
        <>
            <Col sm={{ size: 10 }}>
                {checkboxes.map(({ checkboxLabel, checkboxArrayValue, value, disabled }) => (
                    <FormGroup key={value}>
                        <Input
                            id={`checkbox${value}`}
                            type="checkbox"
                            checked={checkboxArrayValue}
                            onChange={handleCheckboxChange(value)}
                            // Disable special option if it's 'alwaysOn'
                            disabled={disabled}
                        />
                        {' '}
                        <Label check>{checkboxLabel}</Label>
                    </FormGroup>
                ))}
            </Col>
            <FormGroup check row>
                <Col sm={{ offset: 2, size: 10 }}>
                    <Button>Submit</Button>
                </Col>
            </FormGroup>
        </>
    );
};

export default VisibilityInput;