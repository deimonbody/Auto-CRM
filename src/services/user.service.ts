import { IUser } from "@src/common/interface";
import {
  auth,
  db,
  faceBookProvider,
  googleProvider,
} from "@src/config/firebase.config";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { ROLE, UserRole } from "@src/common/enum";

interface IGetUserAuthByEmailProps {
  email: string;
  password: string;
}

interface IRegisterUserByEmailProps extends IGetUserAuthByEmailProps {
  firstName: string;
  lastName: string;
  age: number;
}

export class UserService {
  static async getUserAuthByEmail({
    email,
    password,
  }: IGetUserAuthByEmailProps): Promise<User> {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getUserAuthByGoogle(): Promise<User> {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      GoogleAuthProvider.credentialFromResult(res);
      const { user } = res;
      return user;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getUserAuthByFaceBook(): Promise<User> {
    try {
      const res = await signInWithPopup(auth, faceBookProvider);
      FacebookAuthProvider.credentialFromResult(res);
      const { user } = res;
      return user;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async registerUserByEmail({
    email,
    password,
    firstName,
    lastName,
    age,
  }: IRegisterUserByEmailProps): Promise<IUser> {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const userForDB: IUser = {
        firstName,
        lastName,
        age,
        role: ROLE.PASSENGER,
        userRole: UserRole.USER,
        userID: user.uid,
      };
      const result = await this.setUserDB(userForDB);
      if (result) {
        return userForDB;
      }
      return await Promise.reject("User wasn`t register");
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getUserDBByID(userID: string): Promise<IUser | null> {
    try {
      let user: IUser | null = null;

      const usersDB = await getDocs(collection(db, "users"));
      usersDB.forEach((el) => {
        const docData = el.data();
        if (docData.userID === userID) {
          user = docData as IUser;
        }
      });
      return user;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async setUserDB(user: IUser) {
    try {
      await setDoc(doc(db, "users", user.userID), user);
      return true;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async registerByGoogle() {
    try {
      const { displayName, uid } = await this.getUserAuthByGoogle();
      const [firstName, lastName] = displayName?.split(" ") || [
        "No data",
        "No data",
      ];

      const userForDB: IUser = {
        firstName,
        lastName,
        userID: uid,
        userRole: UserRole.USER,
        role: ROLE.PASSENGER,
        age: 1,
      };

      const result = await this.setUserDB(userForDB);
      if (result) {
        return userForDB;
      }
      return await Promise.reject("User didn`t register");
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async registerByFaceBook() {
    try {
      const { displayName, uid } = await this.getUserAuthByFaceBook();
      const [firstName, lastName] = displayName?.split(" ") || [
        "No data",
        "No data",
      ];

      const userForDB: IUser = {
        firstName,
        lastName,
        userID: uid,
        userRole: UserRole.USER,
        role: ROLE.PASSENGER,
        age: 1,
      };

      const result = await this.setUserDB(userForDB);
      if (result) {
        return userForDB;
      }
      return await Promise.reject("User didn`t register");
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async logoutUser() {
    try {
      await signOut(auth);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
