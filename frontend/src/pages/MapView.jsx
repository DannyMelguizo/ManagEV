//@services
import {doc, getDoc} from "firebase/firestore";
import {firestore} from "../services/firebase/firebase_config";
//@context
import { UserAuth } from "../context/AuthContext";
//@components
import MapUser from "components/MapUser";
import MapAdmin from "components/MapAdmin";
//@react
import { useState } from "react";


const MapView = () => {

  const { user } = UserAuth();
  const [rol, setRol] = useState(null);

  const getRol = async (uid)  => {
    const docRef = doc(firestore, `usuarios/${uid}`);
    const datosCifrados = await getDoc(docRef);
    const datos = datosCifrados.data().rol;

    return datos;
  }

  getRol(user.uid).then((rol) => {
    setRol(rol);
  });

  return (
    <>
      {rol === "user" ? <MapUser/> : <MapAdmin/>}
    </>
  );
};
export default MapView;
