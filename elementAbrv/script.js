var current = "paragraph"; // GET SELECTED ELEMENT FROM ALEX
$(document).ready(function(){
    console.log("HELLO");
    $('#openBtn').click(function() {
        console.log("HELLO");
        switch (current) {
            // ADD YOUR NEW CASES HERE
            case "paragraph": {
                $('#myModalParagraph').modal({show: true});
                break;
            }
            case "footer": {
                $('#myModalFooter').modal({show: true});
                break;
            }
        }
    });
});
