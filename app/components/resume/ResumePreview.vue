<script setup lang="ts">
const { resume } = useResumeData()
</script>

<template>
  <div class="resume-wrapper">
    <!-- A4 Container -->
    <div class="resume-container">
      <!-- Single-column vertical stack -->
      <div class="resume-content">
        <!-- Header with Photo + Name + Contact -->
        <ResumeHeader :basics="resume.basics" />

        <!-- Summary -->
        <ResumeSummary :summary="resume.basics.summary" />

        <!-- Skills & Qualifications -->
        <ResumeAdditionalInfo :skills="resume.skills" />

        <!-- Experience -->
        <ResumeExperience :work="resume.work" />

        <!-- Education -->
        <ResumeEducation :education="resume.education" />

        <!-- Languages & Certifications -->
        <ResumeLanguages :languages="resume.languages" :certifications="resume.certificates" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.resume-wrapper {
  background: #f3f4f6;
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
  min-height: 100vh;
}

.resume-container {
  background: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  width: 210mm;
  max-width: 210mm;
}

.resume-content {
  display: flex;
  flex-direction: column;
  padding: 2rem !important;
}

@media print {
  .resume-wrapper {
    background: white !important;
    padding: 0 !important;
    display: block !important;
  }

  .resume-container {
    width: 210mm !important;
    max-width: none !important;
    box-shadow: none !important;
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .resume-content {
    padding: 1rem !important;
  }

  * {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
    hyphens: none !important;
    -webkit-hyphens: none !important;
  }

  section {
    break-inside: avoid;
  }
}
</style>
