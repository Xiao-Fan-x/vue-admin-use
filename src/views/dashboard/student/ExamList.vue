<template>
  <el-button type="primary" @click="startExam">确 定</el-button>
</template>

<script>
export default {
  name: "ExamList",
  methods: {
    startExam() {
      this.$router.push({name: 'examPage', params: {examId: 22053020}})
    }
  }
}
</script>

<style scoped>

</style>
