export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email)
}
export const getInitials = (name) => {
    if(!name) return ""
    const words = name.split(" ") //tach chuoi thanh cac tu
    let initials = "" // luu cac tu viet tat
    for (let i = 0 ; i < Math.min(words.length, 2); i++) { //John Doe
        initials = initials + words[i][0] // J D
        
       
    }
    return initials.toUpperCase() 
     //So sánh chuỗi mà không phân biệt chữ hoa, chữ thường.
        //Chuyển đổi dữ liệu đầu vào của người dùng thành chữ thường để dễ dàng xử lý hoặc lưu trữ.
        //Chuẩn hóa chuỗi ký tự trước khi thực hiện các thao tác tìm kiếm hoặc thay thế.
}
