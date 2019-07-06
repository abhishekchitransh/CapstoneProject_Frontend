import * as Utils from './Utils.js';
import * as Constants from './Constants';

const baseURL = "http://localhost:8080/api/";
const access_token = 'eyJraWQiOiJlZTNmODY1Zi0wNGE0LTQ0YWUtODkzMS1lOWQ2ZDUxMTNkZmMiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiIyZjdmMGI4Zi05M2JjLTRlMTItOGMwYS1hNmM3NTFkMTc2YmUiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTU2MTI0OCwiaWF0IjoxNTYxMjE5fQ.r8qYg2BoR9qSrSrcnr8SDz_zxEbhaM94Lj-H2aprGLZf9K0DK0x3Uq4du1thoB9Ed72aB7g57XmK8MXismL94A';
const req_header = {
  "Accept": "application/json;charset=UTF-8",
  "authorization": "Bearer " +  access_token 
}


export function getCountry() {
    return [
  {name: 'Afghanistan', code: 'AF'},{name: 'Åland Islands', code: 'AX'},{name: 'Albania', code: 'AL'},{name: 'Algeria', code: 'DZ'},{name: 'American Samoa', code: 'AS'},{name: 'AndorrA', code: 'AD'},{name: 'Angola', code: 'AO'}, {name: 'Anguilla', code: 'AI'},{name: 'Antarctica', code: 'AQ'},{name: 'Antigua and Barbuda', code: 'AG'},{name: 'Argentina', code: 'AR'}, {name: 'Armenia', code: 'AM'},{name: 'Aruba', code: 'AW'}, {name: 'Australia', code: 'AU'},{name: 'Austria', code: 'AT'},{name: 'Azerbaijan', code: 'AZ'},{name: 'Bahamas', code: 'BS'}, {name: 'Bahrain', code: 'BH'},{name: 'Bangladesh', code: 'BD'}, {name: 'Barbados', code: 'BB'},{name: 'Belarus', code: 'BY'}, {name: 'Belgium', code: 'BE'}, {name: 'Belize', code: 'BZ'}, {name: 'Benin', code: 'BJ'}, {name: 'Bermuda', code: 'BM'},{name: 'Bhutan', code: 'BT'},{name: 'Bolivia', code: 'BO'},{name: 'Bosnia and Herzegovina', code: 'BA'},   {name: 'Botswana', code: 'BW'},   {name: 'Bouvet Island', code: 'BV'},   {name: 'Brazil', code: 'BR'},   {name: 'British Indian Ocean Territory', code: 'IO'},   {name: 'Brunei Darussalam', code: 'BN'},   {name: 'Bulgaria', code: 'BG'},   {name: 'Burkina Faso', code: 'BF'},   {name: 'Burundi', code: 'BI'},   {name: 'Cambodia', code: 'KH'},   {name: 'Cameroon', code: 'CM'},   {name: 'Canada', code: 'CA'},   {name: 'Cape Verde', code: 'CV'},{name: 'Cayman Islands', code: 'KY'},   {name: 'Central African Republic', code: 'CF'},   {name: 'Chad', code: 'TD'}]
}

export function getStates() {
  return {
    "states": [
      {
        "id": "aa174a25-ba31-45a8-85b4-b06ffc9d5f8f",
        "state_name": "Andaman and Nicobar Islands"
      },
      {
        "id": "c5c58cc3-3f30-4244-86db-ff4bfd2ea50b",
        "state_name": "Andhra Pradesh"
      },
      {
        "id": "8c174b25-bb31-56a8-88b4-d06ffc9d5f89",
        "state_name": "Arunachal Pradesh"
      },
      {
        "id": "9c174b25-cb31-66a8-98b4-d06ffc9d5f9f",
        "state_name": "Assam"
      },
      {
        "id": "f114b346-a237-11e8-9077-720006ceb890",
        "state_name": "Bihar"
      },
      {
        "id": "24614e76-a238-11e8-9077-720006ceb890",
        "state_name": "Chandigarh"
      },
      {
        "id": "24615498-a238-11e8-9077-720006ceb890",
        "state_name": "Chhattisgarh"
      },
      {
        "id": "2461589e-a238-11e8-9077-720006ceb890",
        "state_name": "Dadar and Nagar Haveli"
      },
      {
        "id": "00ae33e8-a235-11e8-9077-720006ceb890",
        "state_name": "Daman and Diu"
      },
      {
        "id": "24615c0e-a238-11e8-9077-720006ceb890",
        "state_name": "Delhi"
      },
      {
        "id": "24615f4c-a238-11e8-9077-720006ceb890",
        "state_name": "Goa"
      },
      {
        "id": "246162a8-a238-11e8-9077-720006ceb890",
        "state_name": "Gujarat"
      },
      {
        "id": "246165d2-a238-11e8-9077-720006ceb890",
        "state_name": "Haryana"
      },
      {
        "id": "2461973c-a238-11e8-9077-720006ceb890",
        "state_name": "Himachal Pradesh"
      },
      {
        "id": "359f7e8a-a23b-11e8-9077-720006ceb890",
        "state_name": "Jammu and Kashmir"
      },
      {
        "id": "5485e5b4-a23b-11e8-9077-720006ceb890",
        "state_name": "Jharkhand"
      },
      {
        "id": "5485eb18-a23b-11e8-9077-720006ceb890",
        "state_name": "Karnataka"
      },
      {
        "id": "3097b8f4-a294-11e8-9a3a-720006ceb890",
        "state_name": "Kerala"
      },
      {
        "id": "9df46816-a294-11e8-9a3a-720006ceb890",
        "state_name": "Lakshadweep"
      },
      {
        "id": "1dd86f90-a296-11e8-9a3a-720006ceb890",
        "state_name": "Madhya Pradesh"
      },
      {
        "id": "c860e78a-a29b-11e8-9a3a-720006ceb890",
        "state_name": "Maharashtra"
      },
      {
        "id": "19a4b6b2-a29c-11e8-9a3a-720006ceb890",
        "state_name": "Manipur"
      },
      {
        "id": "bb174a25-ba31-45a8-85b4-b06ffc9d5f8f",
        "state_name": "Meghalaya"
      },
      {
        "id": "7c174b25-bb31-46a8-87b4-c06ffc9d5f8f",
        "state_name": "Mizoram"
      },
      {
        "id": "ee174a25-ba31-45a8-85b4-b06ffc9d5f8f",
        "state_name": "Nagaland"
      },
      {
        "id": "9d174b25-cb31-66a8-98b4-d06ffc9d5f9f",
        "state_name": "Odisha"
      },
      {
        "id": "9e174b25-cb31-66a8-98b4-d06ffc9d5f9f",
        "state_name": "Puducherry"
      },
      {
        "id": "9f174b25-cb31-66a8-98b4-d06ffc9d5f9f",
        "state_name": "Punjab"
      },
      {
        "id": "64a087d1-3232-4e17-b715-5d4e94f7f536",
        "state_name": "Rajasthan"
      },
      {
        "id": "1e623f93-3095-4ea4-97e3-5ff5c2a7cad0",
        "state_name": "Sikkim"
      },
      {
        "id": "3ce0cc8b-2a77-4125-b521-418a82428a77",
        "state_name": "Tamil Nadu"
      },
      {
        "id": "9f7be9a1-30ad-4c93-b5ca-615606bc9690",
        "state_name": "Telangana"
      },
      {
        "id": "462b90b8-2a9c-47ec-9a03-e492c201c828",
        "state_name": "Tripura"
      },
      {
        "id": "7d174a25-ba31-45a8-85b4-b06ffc9d5f8f",
        "state_name": "Uttar Pradesh"
      },
      {
        "id": "6c84c29a-3a79-4a60-adad-d1cf9fb44575",
        "state_name": "Uttarakhand"
      },
      {
        "id": "009ae262-a234-11e8-b475-720006ceb890",
        "state_name": "West Bengal"
      }
    ]
  }
}


export function getPaymentMethods(){
  const url = baseURL + '/payments'
  const that = this;

  Utils.makeApiCall(
    url, 
    null,
    null,
    Constants.ApiRequestTypeEnum.GET,
    req_header,
    responseText => {
      console.log(responseText);
      }
    )
}