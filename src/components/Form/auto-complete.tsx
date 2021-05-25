import { useTranslation } from 'next-i18next';
import { Controller } from 'react-hook-form';
import usePlacesAutoComplete, {
  getGeocode,
  getZipCode,
} from 'use-places-autocomplete';
import Downshift from 'downshift';
import formStyles from './styles.module.scss';

export function AddressAutoComplete() {
  const { t } = useTranslation('checkout');
  const {
    ready,
    value,
    setValue,
    clearSuggestions,
    suggestions: { data },
  } = usePlacesAutoComplete({
    requestOptions: {
      componentRestrictions: {
        country: 'ca',
      },
    },
  });

  let scheduled: null | string = null;
  function debounceInput(inputValue: string) {
    if (!scheduled) {
      window.setTimeout(() => {
        setValue(scheduled ?? '');
        scheduled = null;
      }, 300);
    }
    scheduled = inputValue;
  }

  async function handleSelect(
    { description }: { description: string },
    onChange: Function,
  ) {
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    const fullAddress = await getGeocode({ address: description })
      .then((results) => getZipCode(results[0], false))
      .then((zipCode) => {
        return `${description}, ${zipCode}`;
      })
      .catch((error) => {
        console.log('😱 Error: ', error);
        return '';
      });

    // Add the value to the react-hook-form store
    onChange(fullAddress);
  }

  return (
    <>
      <Controller
        name='address'
        rules={{ required: `${t('form.address.error.required')}` }}
        render={({ field: { ref, ...rest } }) => (
          <Downshift
            initialInputValue={value}
            onInputValueChange={(inputValue) => debounceInput(inputValue)}
            itemToString={(item) => item?.description ?? ''}
            labelId='address-label'
            {...rest}
            onChange={(item) => handleSelect(item, rest.onChange)}
          >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              isOpen,
              highlightedIndex,
            }) => (
              <div
                className={`${formStyles.field} autocomplete`}
                data-isopen={isOpen}
              >
                <label
                  {...getLabelProps({
                    htmlFor: 'address',
                    id: 'address-label',
                  })}
                >
                  {t('form.address.name')}
                </label>
                <div className='combobox'>
                  <input
                    {...getInputProps({ id: 'address' })}
                    placeholder='Enter an address'
                    disabled={!ready}
                  />
                  <ul {...getMenuProps({ id: 'address-menu' })}>
                    {isOpen
                      ? data.map((item, index) => {
                          const {
                            place_id,
                            structured_formatting: {
                              main_text,
                              secondary_text,
                            },
                          } = item;

                          return (
                            <li
                              className={
                                highlightedIndex == index && 'selected'
                              }
                              {...getItemProps({ item, index, key: place_id })}
                            >
                              <strong>{main_text}</strong>{' '}
                              <small>{secondary_text}</small>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              </div>
            )}
          </Downshift>
        )}
      />
      <style jsx>{`
        .combobox {
          display: flex;
          flex-direction: column;
        }

        .combobox:focus-within {
          outline: 2px dashed hsl(var(--theme-color-accent));
          outline-offset: 0.25em;
        }

        input ::placeholder {
          opacity: 0;
        }

        input:focus {
          appearance: none;
          box-shadow: none;
          outline: 0;
        }

        ul {
          border: 1px solid hsl(var(--border-color));
          border-style: none solid solid;
          border-radius: 0 0 0.5rem 0.5rem;
          margin-top: -1px;
        }

        li {
          padding-left: 1rem;
          padding-right: 1rem;
        }

        .autocomplete[data-isopen='true'] input {
          border-radius: 4px 4px 0 0;
        }

        .selected {
          background-color: hsl(var(--theme-color-hg));
        }
      `}</style>
    </>
  );
}
