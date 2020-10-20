
export function showToast(title:string, message:string, success:boolean, toast:any){
    toast({
        position: "top-right",
        title: title,
        description: message,
        status: (success) ? "success" : "error",
        duration: 3000,
        isClosable: true,
    })
}