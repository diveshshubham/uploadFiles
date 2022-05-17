# Upload, view, save file details, filter, sort your file details

##

> Upload the file

```json
{
  "message": "Uploaded the file successfully: Thermal Engineering By R. K. Rajput 8 Ed. ( PDFDrive ).pdf"
}
```

Authentication Required : No

This endpoint will upload file and save it's details in db

### HTTP Request

`POST http://localhost:8086/upload`

### Body Parameters

| Parameter | Type                    | Required | Description                  |
| --------- | ----------------------- | -------- | ---------------------------- |
| file      | form data (select file) | Yes      | select file from your device |

## GET details of uploaded files from mongo collection

> To get details from db -

```json
{
  "message": "success",
  "totalCount": 3,
  "data": [
    {
      "_id": "628421970cd129723139ebf3",
      "fileName": "Screenshot from 2022-04-11 19-41-21.png-1649686309343",
      "fileType": "application/octet-stream",
      "fileSize": 57.2880859375,
      "filePath": "/home/hyper-shubham/Desktop/etc/file_directory/public/uploads/Screenshot from 2022-04-11 19-41-21.png-1649686309343",
      "updatedAt": "2022-05-17T22:28:39.609Z",
      "__v": 0
    },
    {
      "_id": "628428bd0c9a5650af0c5f95",
      "fileName": "Thermal Engineering By R. K. Rajput 8 Ed. ( PDFDrive ).pdf",
      "fileType": "application/pdf",
      "fileSize": 0.3203125,
      "filePath": "/home/hyper-shubham/Desktop/etc/file_directory/public/uploads/Thermal Engineering By R. K. Rajput 8 Ed. ( PDFDrive ).pdf",
      "updatedAt": "2022-05-17T22:59:09.412Z",
      "__v": 0
    },
    {
      "_id": "62842a1d0c9a5650af0c5f99",
      "fileName": "Free-Rent-Receipt-Template.docx",
      "fileType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "fileSize": 19.3369140625,
      "filePath": "/home/hyper-shubham/Desktop/etc/file_directory/public/uploads/Free-Rent-Receipt-Template.docx",
      "updatedAt": "2022-05-17T23:05:01.762Z",
      "__v": 0
    }
  ]
}
```

Authentication Required : No

This endpoint retrieves details as per user's requirements

### HTTP Request

`GET http://localhost:8086/getFilesDetailsList?pageIndex=1&perPage=10&sortBy=&order=&searchByFile=&searchByType=&searchName=&searchType=`

### Query String Parameters

| Parameter                | Type            | Required | Description                                                               |
| ------------------------ | --------------- | -------- | ------------------------------------------------------------------------- |
| pageIndex                | Number          | Yes      | page index                                                                |
| perPage                  | Number          | Yes      | Data required per page                                                    |
| sortBy                   | String          | No       | sort by fileSize, fileName, uploadedDate                                  |
| order                    | Integer         | No       | 1 for asceding order, -1 for descending order                             |
| searchByName,searchName  | Integer,String  | No       | 1 for searchByFile, put any file name that user want to search            |
| searchByType, searchType | Integer, String | No       | 1 for searchByType, the type of file user want to search lik pdf, png etc |

## GET file name and url list to download files

> get file name and url

```json
[
    {
        "name": "Free-Rent-Receipt-Template.docx",
        "url": "http://localhost:8086/files/Free-Rent-Receipt-Template.docx"
    },
    {
        "name": "Screenshot from 2022-04-11 19-41-21.png-1649686309343",
        "url": "http://localhost:8086/files/Screenshot from 2022-04-11 19-41-21.png-1649686309343"
    },
    {
        "name": "Thermal Engineering By R. K. Rajput 8 Ed. ( PDFDrive ).pdf",
        "url": "http://localhost:8086/files/Thermal Engineering By R. K. Rajput 8 Ed. ( PDFDrive ).pdf"
    }
]
```

Authentication Required : No

This endpoint retrieves url and filenae from directory 

### HTTP Request

`GET http://localhost:8086/files`

## Dowload the file from the link user got from above api

> download file

```json
{}
```

Authentication Required : No

This endpoint download the file a example path has shown below

### HTTP Request

`GET http://localhost:8086/files/Screenshot from 2022-04-11 19-41-21.png-1649686309343`
