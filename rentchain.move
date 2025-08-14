module RentChain::PropertyRental {
    use aptos_framework::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use std::string::{Self, String};
    use std::vector;
    use aptos_std::table::{Self, Table};

    /// Property status enum representation
    const STATUS_AVAILABLE: u8 = 0;
    const STATUS_BOOKED: u8 = 1;
    const STATUS_COMPLETED: u8 = 2;

    /// Error codes
    const E_PROPERTY_NOT_FOUND: u64 = 1;
    const E_NOT_AVAILABLE: u64 = 2;
    const E_INCORRECT_PAYMENT: u64 = 3;
    const E_NOT_OWNER: u64 = 4;
    const E_NOT_BOOKED: u64 = 5;
    const E_INSUFFICIENT_BALANCE: u64 = 6;

    /// Struct representing a property
    struct Property has store, copy {
        id: u64,
        name: String,
        location: String,
        price: u64,
        owner: address,
        renter: address,
        status: u8,
    }

    /// Global resource to store all properties and counter
    struct PropertyRegistry has key {
        properties: Table<u64, Property>,
        property_count: u64,
    }

    /// Initialize the property registry
    fun init_module(account: &signer) {
        let registry = PropertyRegistry {
            properties: table::new(),
            property_count: 0,
        };
        move_to(account, registry);
    }

    /// Function to list a new property
    public fun list_property(
        owner: &signer,
        name: String,
        location: String,
        price: u64
    ) acquires PropertyRegistry {
        let owner_addr = signer::address_of(owner);
        let registry = borrow_global_mut<PropertyRegistry>(@RentChain);
        
        let property = Property {
            id: registry.property_count,
            name,
            location,
            price,
            owner: owner_addr,
            renter: @0x0,
            status: STATUS_AVAILABLE,
        };
        
        table::add(&mut registry.properties, registry.property_count, property);
        registry.property_count = registry.property_count + 1;
    }

    /// Function to book a property
    public fun book_property(
        renter: &signer,
        property_id: u64,
        payment: u64
    ) acquires PropertyRegistry {
        let renter_addr = signer::address_of(renter);
        let registry = borrow_global_mut<PropertyRegistry>(@RentChain);
        
        assert!(table::contains(&registry.properties, property_id), E_PROPERTY_NOT_FOUND);
        
        let property = table::borrow_mut(&mut registry.properties, property_id);
        assert!(property.status == STATUS_AVAILABLE, E_NOT_AVAILABLE);
        assert!(payment == property.price, E_INCORRECT_PAYMENT);
        
        // Transfer payment from renter
        let payment_coin = coin::withdraw<AptosCoin>(renter, payment);
        coin::deposit<AptosCoin>(@RentChain, payment_coin);
        
        // Update property details
        property.renter = renter_addr;
        property.status = STATUS_BOOKED;
    }

    /// Function to complete rental and transfer payment to owner
    public fun complete_rental(
        caller: &signer,
        property_id: u64
    ) acquires PropertyRegistry {
        let caller_addr = signer::address_of(caller);
        let registry = borrow_global_mut<PropertyRegistry>(@RentChain);
        
        assert!(table::contains(&registry.properties, property_id), E_PROPERTY_NOT_FOUND);
        
        let property = table::borrow_mut(&mut registry.properties, property_id);
        assert!(caller_addr == property.owner, E_NOT_OWNER);
        assert!(property.status == STATUS_BOOKED, E_NOT_BOOKED);
        
        // Transfer payment to property owner
        let payment = coin::withdraw<AptosCoin>(caller, property.price);
        coin::deposit<AptosCoin>(property.owner, payment);
        
        // Update property status
        property.status = STATUS_COMPLETED;
    }

    /// Function to get property details
    #[view]
    public fun get_property(property_id: u64): Property acquires PropertyRegistry {
        let registry = borrow_global<PropertyRegistry>(@RentChain);
        assert!(table::contains(&registry.properties, property_id), E_PROPERTY_NOT_FOUND);
        *table::borrow(&registry.properties, property_id)
    }

    /// Function to get total property count
    #[view]
    public fun get_property_count(): u64 acquires PropertyRegistry {
        let registry = borrow_global<PropertyRegistry>(@RentChain);
        registry.property_count
    }
}