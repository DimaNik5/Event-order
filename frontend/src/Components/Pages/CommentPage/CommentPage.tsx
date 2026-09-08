import InfoLayout from "@/Components/Layouts/InfoLayout/InfoLayout";
import useCommentPage from "./useCommentPage";
import LargePanel from "@/Components/Wrapper/LargePanel";
import CommentPanel from "@/Components/Wrapper/CommentPanel";

export default function CommentPage(){
    const [head] = useCommentPage();

    return (
        <InfoLayout header={head}>
            <LargePanel>
                <CommentPanel/>
            </LargePanel>
        </InfoLayout>
    );
}