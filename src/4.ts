class Key {
    private readonly signature: number;
    
    constructor() {
      this.signature =
        Math.floor(Math.random() * (999_999_999 - 100_000_000 + 1)) + 100_000_000;
    }
  
    getSignature(): number {
      return this.signature;
    }
  }
  
  class Person {
    constructor(private key: Key) {}
  
    getKey(): Key {
      return this.key;
    }
  }
  
  abstract class House {
    protected door = false;
    private tenants: Person[] = [];
  
    constructor(public readonly key: Key) {}
  
    public comeIn(person: Person) {
      if (this.door) {
        this.tenants.push(person);
        this.door = false;
        console.log("Person entered the house.");
      } else {
        console.error("Access denied.");
      }
    }
  
    public abstract openDoor(key: Key): void;
  
    public getTenants(): Person[] {
      return this.tenants;
    }
  }
  
  class MyHouse extends House {
    constructor(key: Key) {
      super(key);
    }
  
    openDoor(key: Key) {
      if (this.key.getSignature() === key.getSignature()) {
        this.door = true;
        console.log("Door is open.");
      } else {
        console.log("Wrong key. Door remains closed.");
      }
    }
  }
  
  const key = new Key();
  const house = new MyHouse(key);
  const person = new Person(key);
  
  house.openDoor(person.getKey());
  house.comeIn(person);
  
  console.log(house.getTenants()); // [person]
  
  const key2 = new Key();
  const person2 = new Person(key2);
  
  house.openDoor(person2.getKey());
  house.comeIn(person2); // Access denied
  
  console.log(house.getTenants()); // [person]
  