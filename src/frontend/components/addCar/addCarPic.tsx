import { Button } from "@mui/material";
import React from "react";
import Modal from "./alert";
import { Car } from '../../app/interface' 
import { useAuth } from "../authwarn/AuthContext";

interface AddCarPicsProps {
  handleNext: () => void;
  setCurrCarInfo: (info: Car) => void | null;
  currCarInfo: Car | null;
}

export default function AddCarPics({ handleNext, setCurrCarInfo, currCarInfo }: AddCarPicsProps) {
    const [modalMessage, setModalMessage] = React.useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [Pics, setPics] = React.useState<string[]>([]);
    const {token } = useAuth()
    console.log("[AddCarPics->state:Pics]: ", Pics)


    console.log("[AddCarPics->state:currCarInfo]: ",currCarInfo)
    
    const handleSubmit = async()=>{    
      // formData 2 json
      if (Pics.length === 0) {
        setModalMessage('No pictures to submit');
        setIsModalOpen(true);
        return;
      }
  
      // carPics Array for submit
      const carPics = Pics.map((fileName) => ({ fileName }));

      const formData = {
        carPics,
      };
    
      try {
        if(!currCarInfo || !currCarInfo.ID){
          console.log("bugs!")
          return
        }
        const response = await fetch(`http://localhost:8080/api/v1/cars/info/update/${currCarInfo.ID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(formData),
        });
        
        // parse response 2 json
        const result = await response.json();
        setCurrCarInfo(result)
  
        if (!response.ok) {
          console.log("[AddCarPics->handleSubmit->response.body]: ",response.body)
          throw new Error(`Update this car info failed! INFO: ${result.error}`);
        }
        
        setModalMessage(result.message || 'Success!');
        
        
      } catch (error) {
        if (error instanceof Error) {
          setModalMessage(`Error: ${error.message}`);
        } else {
          setModalMessage('An unknown error occurred');
        }
      } finally {
        setIsModalOpen(true);
      }
    };

    const closeModal = () => {
        handleNext()
      };
    
    
    return(
        <div>
            <UploadPhoto msg="upload car pics" setAvatar={setPics}/>
            {Pics && (
                Pics
            )} 
            <Button onClick={handleSubmit}> Submit </Button>
            <Modal open={isModalOpen} message={modalMessage} onClose={closeModal} />
        </div>
        
    )
}


// 定义 UploadPhoto 组件的 props 类型
interface UploadPhotoProps {
  msg: string;
  setAvatar: (urls: string[]) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ msg, setAvatar }) => {
  const [files, setFiles] = React.useState<File[]>([]);

  // 事件处理函数的类型注释
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    // 使用 map 方法处理文件上传
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('photo', file);

      const res = await fetch('http://localhost:8080/api/v1/upload/pic', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const photoUrl = `http://localhost:8080/api/v1/upload/pic/${file.name}`;
        return photoUrl;
      } else {
        return null;
      }
    });

    // 等待所有文件上传完成
    const uploadedUrls = await Promise.all(uploadPromises);
    const filteredUrls = uploadedUrls.filter((url): url is string => url !== null);

    setAvatar(filteredUrls);
  };

  return (
    <div>
      <h3>{msg}</h3>
      <Button component="label">
        Select Photo
        <input type="file" multiple hidden onChange={handleFileChange} />
      </Button>

      <Button variant="contained" onClick={handleUpload}>Upload</Button>
    </div>
  );
};