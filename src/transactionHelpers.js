// src/transactionHelpers.js
export const listPropertyTx = ({ name, location, price }) => ({
  data: {
    function: "0xYourModuleAddress::PropertyRental::list_property",
    typeArguments: [],
    functionArguments: [name, location, price.toString()],
  },
});

export const bookPropertyTx = ({ propertyId, payment }) => ({
  data: {
    function: "0xYourModuleAddress::PropertyRental::book_property",
    typeArguments: [],
    functionArguments: [propertyId.toString(), payment.toString()],
  },
});

// Similarly define completeRentalTx

